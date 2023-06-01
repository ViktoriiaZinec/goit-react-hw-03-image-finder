import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Component } from 'react';

export class App extends Component {
  state = {
    search: '',
  };

  updateSearch = searchLine => {
    this.setState({ search: searchLine });
  };
  render() {
    return (
      <>
        <SearchBar update={this.updateSearch} />
        <ImageGallery search={this.state.search} />
      </>
    );
  }
}
