import css from '../css/Styles.module.css';

export function Button({ onLoadMore }) {
  function handleClick() {
    onLoadMore();
  }
  return (
    <button
      type="button"
      className={css.button_load_more}
      onClick={handleClick}
    >
      <span className={css.button_label}>Load more</span>
    </button>
  );
}
