// import { Audio } from 'react-loader-spinner';
import css from '../css/Styles.module.css';
import { ColorRing } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className={css.loader}>
      {/* <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
      /> */}
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </div>
  );
};