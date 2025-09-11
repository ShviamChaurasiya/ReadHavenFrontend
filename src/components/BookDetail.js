import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import books from '../data';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const selectedBook = books.find((b) => b.id === parseInt(id));
    setBook(selectedBook);
  }, [id]);

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