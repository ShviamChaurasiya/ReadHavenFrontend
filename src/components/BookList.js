import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Skeleton component for a single book card
const BookCardSkeleton = () => (
  <div className="col-md-4 mb-4">
    <div className="card h-100">
      <div className="skeleton-placeholder skeleton-image"></div>
      <div className="card-body d-flex flex-column p-3">
        <div className="skeleton-placeholder skeleton-text title"></div>
        <div className="skeleton-placeholder skeleton-text paragraph"></div>
        <div className="skeleton-placeholder skeleton-text short"></div> {/* Placeholder for download_count */} 
        <div className="skeleton-placeholder skeleton-button mt-auto"></div>
      </div>
    </div>
  </div>
);

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [numBooksToAdd, setNumBooksToAdd] = useState(1);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3330/api/books');
      setBooks(response.data);
      setError(null);
    } catch (error) {
      setError('Error fetching books. Please try again later.');
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddRandomBooks = async () => {
    try {
      await axios.post('http://localhost:3330/api/books/populate-random', { count: numBooksToAdd });
      fetchBooks(); // Refresh the book list
    } catch (error) {
      console.error('Error adding random books:', error);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Books</h1>
        <div className="d-flex">
          <input
            type="number"
            className="form-control d-inline-block w-auto me-2"
            value={numBooksToAdd}
            onChange={(e) => setNumBooksToAdd(parseInt(e.target.value, 10))}
            min="1"
          />
          <button className="btn btn-success me-2" onClick={handleAddRandomBooks}>
            Add Random Books
          </button>
          <input
            type="text"
            className="form-control d-inline-block w-auto"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && <p className="text-danger">{error}</p>}

      {loading ? (
        <div className="row">
          {[...Array(6)].map((_, index) => (
            <BookCardSkeleton key={index} />
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default BookList;
