import { Component } from 'react';
import css from '../css/Styles.module.css';
import propTypes from 'prop-types';

export class SearchBar extends Component {
  state = {
    search: '',
  };

  handleChange = event => {
    this.setState({ search: event.target.value });
    // console.log(event.target.value, this.props.update);
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state.search);
    if (!this.state.search.trim()) {
      return alert('Please type text');
    }
    //props - function update from parent(App)
    this.props.update(this.state.search);
  };
  render() {
    return (
      <header className={css.search_bar}>
        <form className={css.search_form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.search_form_button}>
            <span className={css.search_form_button_label}>Search</span>
          </button>

          <input
            className={css.search_form_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  update: propTypes.func,
};
