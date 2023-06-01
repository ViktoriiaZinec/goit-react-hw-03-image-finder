import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import css from '../css/Styles.module.css';
import { fetchPhotos } from '../../servise/image-servise';
import { Component } from 'react';

export class ImageGallery extends Component {
  state = {
    photos: [],
    loading: true,
    error: false,
    page: 1,
  };

  callServer(searchLine, page) {
    fetchPhotos(searchLine, page).then(result => {
      console.log('fetch', result);

      this.setState(state => ({
        photos: result,
        loading: false,
        error: false,
        page: page,
      }));
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('didUpdate', this.props, this.state);
    if (this.props.search !== prevProps.search) {
      this.callServer(this.props.search, 1);
    }
  }

  render() {
    if (this.state.photos.hits)
      return (
        <ul className={css.image_gallery}>
          {this.state.photos.hits.map(item => (
            <ImageGalleryItem key={item.id} item={item} />
          ))}
        </ul>
      );
    return false;
  }
}
