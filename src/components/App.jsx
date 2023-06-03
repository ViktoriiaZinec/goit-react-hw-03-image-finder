import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Component } from 'react';
import { fetchPhotos } from 'servise/image-servise';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from './css/Styles.module.css';

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
    this.setState(state => ({
      ...state,
      isLoading: true,
      isEmpty: false,
    }));

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
        this.setState({ isLoading: false });
      });
  }

  clearPhotos() {
    this.setState(state => ({
      photos: [],
      loading: false,
      error: false,
      page: 1,
      pageCount: 1,
      isEmpty: false,
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.clearPhotos();
      this.callServer(this.state.search, 1);
    }
  }
  onLoadMore = () => {
    this.callServer(this.state.search, this.state.page + 1);
  };

  updateSearch = searchLine => {
    this.setState({ search: searchLine });
  };

  showModal = item => {
    this.setState(state => {
      return {
        ...state,
        modalItem: item,
      };
    });
  };
  closeModal = () => {
    this.setState(state => {
      return {
        ...state,
        modalItem: null,
      };
    });
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
        {this.state.page < this.state.pageCount ? (
          <Button onLoadMore={this.onLoadMore} />
        ) : (
          ''
        )}
        {this.state.isEmpty ? (
          <p className={css.sorry}> Sorry, there are no photos available</p>
        ) : (
          ''
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
