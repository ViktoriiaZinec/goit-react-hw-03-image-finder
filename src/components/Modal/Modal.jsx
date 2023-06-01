import css from '../css/Styles.module.css';
import { Component } from 'react';

export class Modal extends Component {
  // add key Esc for Close
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDwn);
  }
  // remove Esc after Close
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDwn);
  }
  handleKeyDwn = e => {
    if (e.key === 'Escape') {
      this.props.closeModal('');
    }
  };
  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal('');
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.handleOverlayClick}>
        <div className={css.modal}>
          <img src={this.props.item.largeImageURL} alt={this.props.item.tags} />
        </div>
      </div>
    );
  }
}
