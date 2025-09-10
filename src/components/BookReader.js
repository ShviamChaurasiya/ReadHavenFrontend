import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookReader = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [contentError, setContentError] = useState(null);

  useEffect(() => {
    const fetchBookAndContent = async () => {
      try {
        setLoading(true);
        // Fetch book details
        const bookResponse = await axios.get(`http://localhost:3330/api/books/${id}`);
        setBook(bookResponse.data);

        // Fetch book content if book_url is available
        if (bookResponse.data.book_url) {
          try {
            const contentResponse = await axios.get(`http://localhost:3330/api/books/proxy?url=${encodeURIComponent(bookResponse.data.book_url)}`);
            setContent(contentResponse.data);
            setContentError(null);
          } catch (err) {
            console.error('Error fetching book content:', err);
            setContentError('Could not load book content. It might be in an unsupported format or temporarily unavailable.');
          }
        } else {
          setContentError('No direct book content URL available for this book.');
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
        // Handle error for book details fetch
      } finally {
        setLoading(false);
      }
    };

    fetchBookAndContent();
  }, [id]);

  if (loading) {
    return (
      <div>
        <div className="skeleton-placeholder skeleton-text title" style={{ height: '2em', marginBottom: '1em' }}></div>
        <div className="skeleton-placeholder skeleton-text paragraph short"></div> {/* Placeholder for author */} 
        <hr />
        <div className="book-reader">
          <div className="skeleton-placeholder skeleton-text paragraph"></div>
          <div className="skeleton-placeholder skeleton-text paragraph"></div>
          <div className="skeleton-placeholder skeleton-text paragraph medium"></div>
          <div className="skeleton-placeholder skeleton-text paragraph short"></div>
          <div className="skeleton-placeholder skeleton-text paragraph"></div>
          <div className="skeleton-placeholder skeleton-text paragraph medium"></div>
          <div className="skeleton-placeholder skeleton-text paragraph short"></div>
        </div>
      </div>
    );
  }

  if (!book) {
    return <div>Book not found.</div>;
  }

  const isHtml = book.media_type === 'text/html' || book.book_url.endsWith('.htm') || book.book_url.endsWith('.html');
  const isPdf = book.media_type === 'application/pdf' || book.book_url.endsWith('.pdf');
  const isEpub = book.media_type === 'application/epub+zip' || book.book_url.endsWith('.epub');

  return (
    <div>
      <h1>{book.title}</h1>
      <p className="text-muted">by {book.author}</p>
      <hr />
      {contentError && <div className="alert alert-warning">{contentError}</div>}
      {!contentError && (
        <div className="book-reader">
          {isHtml ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : isPdf || isEpub ? (
            <p>
              This book is available in {isPdf ? 'PDF' : 'EPUB'} format. 
              <a href={book.book_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm ms-2">
                Download {isPdf ? 'PDF' : 'EPUB'}
              </a>
            </p>
          ) : (
            <div style={{ whiteSpace: 'pre-wrap' }}>
              {content ? content : 'No content available for this book.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookReader;
