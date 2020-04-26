import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

const selfName = [ {name: 'Currently Reading', shelf: "currentlyReading"},{name: 'Want to Read', shelf: "wantToRead"},{name:'Read',shelf: "read"}]
class BookSelves extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allBooks: []
    }
  }
  componentDidMount(){
    BooksAPI.getAll().then(data => {
         this.setState({ allBooks: data });
        // console.log(json)
      });
}

   changeBookSelf = (e, bookname) => {
       let allBooks= this.state.allBooks
        const bookDetails= allBooks.filter(Books => Books.title === bookname);
         BooksAPI.update(bookDetails[0], e.target.value);
         let newBookDetails = allBooks.filter(Books => Books.title !== bookname)
         let changeBookName= bookDetails[0]
         delete changeBookName.shelf;
         changeBookName = {...changeBookName,shelf: e.target.value}
         newBookDetails = [...newBookDetails,changeBookName]
         this.setState({
          allBooks: newBookDetails
         })
    };
  bookSelfRow = (selfRowName, allBooks) => {
    // console.log(selfRowName)
    const booksShelfDetails = allBooks.filter(Books => Books.shelf === selfRowName.shelf);
    // console.log(booksShelfDetails)

    
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            booksShelfDetails.map((element, index) =>
              <li key={index}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${element.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select value={element.shelf} onChange={(e) => this.changeBookSelf(e, `${element.title}`)} >
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
            )
          }
        </ol>
      </div>
    )
  }

  render() {
    const { allBooks } = this.state
    // console.log(this.state.booksmrs)
    return (
      <div className="list-books" style={{ paddingBottom: '30px', justifyContent: "center" }}>
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {selfName.length > 0 && selfName.map((selfRowName, index) =>
              <div className="bookshelf" key={index}>
                <h2 className="bookshelf-title">{selfRowName.name}</h2>
                   {this.bookSelfRow(selfRowName,allBooks)}
              </div>
            )}
          </div>
        </div>
        <div className="open-search">
          <Link to="search">
          </Link>
        </div>
      </div>
    )
  }
}

export default BookSelves
