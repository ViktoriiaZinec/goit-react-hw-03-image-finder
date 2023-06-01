import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import css from '../css/Styles.module.css';
import { fetchPhotos } from '../../servise/image-servise';
import { Component } from 'react';
import { Button } from 'components/Button/Button';
import { Modal } from '../Modal/Modal';
import { Loader } from '../Loader/Loader';

export class ImageGallery extends Component {
  state = {
    photos: [],
    loading: true,
    error: false,
    page: 1,
    modalItem: null,
    isLoading: false,
  };

  callServer(searchLine, page) {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    fetchPhotos(searchLine, page)
      .then(result => {
        // console.log('fetch', result, typeof result);
        this.setState(state => ({
          // photos: state.photos.concat(result.hits),
          photos: [...state.photos, ...result.hits],
          loading: false,
          error: false,
          isLoading: false,
          page: page,
        }));
      })
      .catch(error => {
        console.log(error.message);
        this.setState({ isLoading: false });
      });
  }
  clearGallery() {
    this.setState(state => ({
      photos: [],
      loading: false,
      error: false,
      page: 1,
    }));
  }

  showModal = item => {
    // console.log('show', item);
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

  componentDidUpdate(prevProps, prevState) {
    // console.log('didUpdate', this.props, this.state);
    if (this.props.search !== prevProps.search) {
      console.log(this.props.search);
      console.log(prevProps.search);
      this.clearGallery();
      this.callServer(this.props.search, 1);
    }
  }
  onLoadMore = () => {
    this.callServer(this.props.search, this.state.page + 1);
    // this.setState({ ...this.state, isLoading: true });
  };

  render() {
    if (this.state.photos.length) {
      // console.log('render', this.state.photos);
      return (
        <>
          <ul className={css.image_gallery}>
            {this.state.photos.map(item => (
              <ImageGalleryItem
                key={item.id}
                item={item}
                onClick={this.showModal}
              />
            ))}
          </ul>
          <Button onLoadMore={this.onLoadMore} />
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
    return this.state.isLoading && <Loader />;
  }
}
