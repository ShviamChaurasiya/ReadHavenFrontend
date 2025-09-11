import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import books from '../data';

const BookList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Books</h1>
        <div className="d-flex">
          <input
            type="text"
            className="form-control d-inline-block w-auto"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {filteredBooks.map((book) => (
          <div className="col-md-4 mb-4" key={book.id}>
            <div className="card h-100">
              {book.cover_image_url ? (
                <img
                  src={book.cover_image_url}
                  className="card-img-top"
                  alt={book.title}
                  style={{ width: '100%', height: '250px', objectFit: 'cover', objectPosition: 'center' }}
                />
              ) : (
                <div className="no-image-placeholder">
                  No Image Available
                </div>
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.author}</p>
                {book.download_count && <p className="card-text text-muted">Downloads: {book.download_count}</p>}
                <Link to={`/books/${book.id}`} className="btn btn-primary mt-auto">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;