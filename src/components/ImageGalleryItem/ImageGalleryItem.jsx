import css from '../css/Styles.module.css';
import propTypes from 'prop-types';

export function ImageGalleryItem({ item, onClick }) {
  function clickHandler(e) {
    onClick(item);
  }
  return (
    <li className={css.gallery_item}>
      <img
        className={css.image_gallery_item}
        src={item.webformatURL}
        alt={item.tags}
        onClick={clickHandler}
      />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  item: propTypes.object.isRequired,
  onClick: propTypes.func.isRequired,
};
