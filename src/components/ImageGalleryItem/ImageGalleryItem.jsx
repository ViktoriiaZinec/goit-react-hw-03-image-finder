import css from '../css/Styles.module.css';
export function ImageGalleryItem({ item }) {
  return (
    <li className={css.gallery_item}>
      <img src={item.webformatURL} alt={item.tags} />
    </li>
  );
}
