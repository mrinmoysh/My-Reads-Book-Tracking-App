import React from 'react';
import BookshelfChanger from './BookshelfChanger';
import PropTypes from 'prop-types';

const Bookshelf = (props) => {
  const { shelf, books, onMove } = props;
  const booksOnThisShelf = books.filter(book => book.shelf === shelf.key);
  // console.log('booksOnThisShelf', booksOnThisShelf);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title" style={{alignSelf:"center"}}>{shelf.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {booksOnThisShelf.map((book,index) => (
            <li key={index}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${book.imageLinks &&
                      book.imageLinks.thumbnail})`,
                  }}
                />
                <BookshelfChanger book={book} shelf={shelf} onMove={onMove} />
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">
                {book.authors && book.authors.join(', ')}
              </div>
            </div>
          </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  books: PropTypes.array,
  shelf: PropTypes.object,
  onMove: PropTypes.func
};

export default Bookshelf;
