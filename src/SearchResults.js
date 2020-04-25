import React from 'react';
import BookshelfChanger from './BookshelfChanger';

const SearchResults = props => {
  const { searchBooks, myBooks, onMove } = props;

  const updatedBooks = searchBooks.map(book => {
    myBooks.map(b => {
      if (b.id === book.id) {
        book.shelf = b.shelf;
      }
      return b;
    });
    return book;
  });
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {updatedBooks.map(book => (
          <li>
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
              <BookshelfChanger book={book} shelf={book.shelf ? book.shelf : 'none'} onMove={onMove} />
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
  );
};

export default SearchResults;

