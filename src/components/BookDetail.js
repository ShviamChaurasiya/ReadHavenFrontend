import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3330/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="skeleton-placeholder skeleton-image" style={{ height: '350px' }}></div> {/* Adjusted height */} 
        </div>
        <div className="col-md-8">
          <div className="skeleton-placeholder skeleton-text title" style={{ height: '2em', marginBottom: '1em' }}></div> {/* Used title class */} 
          <div className="skeleton-placeholder skeleton-text paragraph short"></div> {/* Used paragraph class */} 
          <div className="skeleton-placeholder skeleton-text paragraph short"></div> {/* Used paragraph class */} 
          <div className="skeleton-placeholder skeleton-text paragraph short"></div> {/* Placeholder for subjects */} 
          <div className="skeleton-placeholder skeleton-text paragraph short"></div> {/* Placeholder for translators */} 
          <div className="skeleton-placeholder skeleton-text paragraph short"></div> {/* Placeholder for bookshelves */} 
          <div className="skeleton-placeholder skeleton-text paragraph short"></div> {/* Placeholder for languages */} 
          <div className="skeleton-placeholder skeleton-text paragraph short"></div> {/* Placeholder for copyright */} 
          <div className="skeleton-placeholder skeleton-text paragraph short"></div> {/* Placeholder for media_type */} 
          <div className="skeleton-placeholder skeleton-text paragraph short"></div> {/* Placeholder for download_count */} 
          <div className="skeleton-placeholder skeleton-text paragraph" style={{ height: '6em' }}></div> {/* Used paragraph class */} 
          <div className="skeleton-placeholder skeleton-button"></div>
        </div>
      </div>
    );
  }

  if (!book) {
    return <div>Book not found.</div>;
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <img src={book.cover_image_url} className="img-fluid" alt={book.title} />
        </div>
        <div className="col-md-8">
          <h1>{book.title}</h1>
          <p><strong>Author:</strong> {book.author}</p>
          {book.subjects && <p><strong>Subjects:</strong> {book.subjects}</p>}
          {book.translators && <p><strong>Translators:</strong> {book.translators}</p>}
          {book.bookshelves && <p><strong>Bookshelves:</strong> {book.bookshelves}</p>}
          {book.languages && <p><strong>Languages:</strong> {book.languages}</p>}
          {book.copyright !== null && <p><strong>Copyright:</strong> {book.copyright ? 'Yes' : 'No'}</p>}
          {book.media_type && <p><strong>Media Type:</strong> {book.media_type}</p>}
          {book.download_count && <p><strong>Downloads:</strong> {book.download_count}</p>}
          <p>{book.description}</p>
          {book.book_url && (
            <a 
              href={book.book_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
            >
              Read Book
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;

