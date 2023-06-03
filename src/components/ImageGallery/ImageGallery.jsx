import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import css from '../css/Styles.module.css';

export function ImageGallery({ photos, onShowModal }) {
  return (
    <>
      <ul className={css.image_gallery}>
        {photos.map(item => (
          <ImageGalleryItem key={item.id} item={item} onClick={onShowModal} />
        ))}
      </ul>
    </>
  );
}
