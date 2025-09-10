import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="/">ReadHaven</a>
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/books/:id" element={<BookDetail />} />
          </Routes>
        </div>
        <footer className="bg-dark text-white text-center py-3 mt-5">
          <div className="container">
            <p>&copy; 2025 ReadHaven. All rights reserved.</p>
            <p>Made and managed by <a href="https://www.linkedin.com/in/shivam--chaurasiya/" target="_blank" rel="noopener noreferrer" style={{ color: '#bb86fc' }}>Shivam Chaurasiya</a></p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;