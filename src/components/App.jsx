import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Component } from 'react';
import { fetchPhotos } from 'servise/image-servise';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from './css/Styles.module.css';
import propTypes from 'prop-types';

export class App extends Component {
  state = {
    photos: [],
    loading: true,
    error: false,
    page: 1,
    modalItem: null,
    isLoading: false,
    pageCount: 1,
    isEmpty: false,
  };

  callServer(searchLine, page) {
    this.setState({
      isLoading: true,
      isEmpty: false,
    });

    fetchPhotos(searchLine, page)
      .then(result => {
        this.setState(state => ({
          photos: [...state.photos, ...result.hits],
          loading: false,
          error: false,
          isLoading: false,
          page: page,
          pageCount: Math.ceil(result.total / 12),
          isEmpty: result.total === 0,
        }));
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(error => {
        this.setState({ isLoading: false });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.callServer(this.state.search, this.state.page);
    }
  }
  onLoadMore = () => {
    this.callServer(
      this.state.search,
      this.state.page + 1,
      this.setState(prev => ({ page: prev.page + 1 }))
    );
  };

  updateSearch = searchLine => {
    this.setState({
      search: searchLine,
      photos: [],
      loading: false,
      error: false,
      page: 1,
      pageCount: 1,
      isEmpty: false,
    });
  };

  showModal = item => {
    this.setState({ modalItem: item });
  };
  closeModal = () => {
    this.setState({ modalItem: null });
  };
  render() {
    return (
      <>
        <SearchBar update={this.updateSearch} />
        <ImageGallery
          // search={this.state.search}
          photos={this.state.photos}
          onShowModal={this.showModal}
        />
        {this.state.page < this.state.pageCount && (
          <Button onLoadMore={this.onLoadMore} />
        )}
        {this.state.isEmpty && (
          <p className={css.sorry}> Sorry, there are no photos available</p>
        )}
        {this.state.modalItem && (
          <Modal
            item={this.state.modalItem}
            closeModal={this.closeModal}
          ></Modal>
        )}
        {this.state.isLoading && <Loader />}
      </>
    );
  }
}

App.propsTypes = {
  search: propTypes.string,
};
