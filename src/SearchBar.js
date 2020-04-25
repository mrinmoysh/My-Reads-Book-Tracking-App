import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }

  handleChange = event => {
    const val = event.target.value;
    this.setState({ value: val }, () => {
      this.props.onSearch(val);
    });
  };

  render() {
    const { onResetSearch } = this.props;
    return (
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search" onClick={onResetSearch}>
            Close
      </button>
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={this.state.value}
            placeholder="Search by title or author"
            onChange={this.handleChange}
            autoFocus
          />
        </div>
      </div>
    )
  }
}

export default SearchBar

