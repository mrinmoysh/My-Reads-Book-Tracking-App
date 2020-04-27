import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';

class SearchBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allNewBooks: [],
      query: '',
      queryStatus: false
    }
  }
  searchBooks = (e) => {
    // console.log(e.target.value)
    const value = e.target.value
    this.setState({ query: value })

    if (value) {
      BooksAPI.search(value, 20).then(newbooks => {
        if (newbooks.length > 0) {
          this.setState({
            allNewBooks: newbooks, queryStatus: true
          })
        }
        else this.setState({ queryStatus: false,allNewBooks:[] })
      }
      )
    }
    else this.setState({ queryStatus: true, allNewBooks: [] })
  }
  addBookSelf = (e, bookname) => {
    console.log(e.target.value)
    let allBooks= this.state.allNewBooks
     const bookDetails= allBooks.filter(Books => Books.title === bookname);
      BooksAPI.update(bookDetails[0], e.target.value);
      let newBookDetails = allBooks.filter(Books => Books.title !== bookname)
      this.setState({
        allNewBooks: newBookDetails
      })
 };

  render() {
    const { query, allNewBooks, queryStatus } = this.state
    // console.log(allNewBooks)
    return (
      <div className="search-book">
          <div className="search-books-bar">
            <Link to="/"><div className="close-search"></div>
            </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.searchBooks}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {queryStatus && allNewBooks.map((element, index) =>
              <li key={index}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" 
                    style={{ width: 128, height: 193,
                     backgroundImage: ((element.imageLinks && element.imageLinks.thumbnail)?`url(${element.imageLinks.thumbnail})`:"none")
                      }}>

                     </div>
                    <div className="book-shelf-changer">
                      <select  onChange={(e) => this.addBookSelf(e, `${element.title}`)} >
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{element.title}</div>
                  <div className="book-authors">{element.authors && element.authors.join(', ')}</div>
                </div>
              </li>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
