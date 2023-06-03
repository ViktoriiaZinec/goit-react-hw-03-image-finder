import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import css from '../css/Styles.module.css';

import { Component } from 'react';

export class ImageGallery extends Component {
  render() {
    return (
      <>
        <ul className={css.image_gallery}>
          {this.props.photos.map(item => (
            <ImageGalleryItem
              key={item.id}
              item={item}
              onClick={this.props.onShowModal}
            />
          ))}
        </ul>
      </>
    );
  }
}
