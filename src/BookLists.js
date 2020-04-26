import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import PropTypes from 'prop-types';

class BookLists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookshelves: this.props.bookshelves,
    }
  }


  render() {
    const { bookshelves} = this.state;
    const {books, onMove} = this.props
    console.log(this.props)
    return (
      <div className="list-books" style={{paddingBottom:'30px',justifyContent:"center"}}>
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
        <div>
          {bookshelves.map((element,index) => (
            <Bookshelf
              key={index}
              shelf={element}
              books={books}
              onMove={onMove}
            />
          ))}
        </div>
      </div>
        <div style={{marginBottom:'30px',backgroundColor:"red"}}>
          <Link to="search">
            <button type="button" className="btn btn-success" style={{alignSelf: 'flex-end',float:'right',marginRight:"30px"}} >Add a Book</button>
          </Link>
        </div>
      </div>
    );
  }
}

BookLists.propTypes = {
  books: PropTypes.array,
  bookshelves: PropTypes.array,
  onMove: PropTypes.func
};

export default BookLists;


