import { useState, useEffect } from 'react';
import { BookService } from '../services/api';
import BookCard from '../components/BookCard';

export default function Search() {
  const [query, setQuery] = useState('JavaScript');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const results = await BookService.searchBooks(searchQuery);
      setBooks(results);
    } catch (err) {
      setError('Не вдалося отримати список книг. Спробуйте пізніше.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(query);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBooks(query);
  };

  return (
    <div>
      <div className="search-container">
        <h1>Знайдіть свою наступну книгу</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Назва книги, автор..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Пошук</button>
        </form>
      </div>

      {loading && <div className="status-msg">⏳ Завантаження бібліотеки...</div>}
      
      {error && <div className="status-msg error-msg">❌ {error}</div>}

      {!loading && !error && books.length === 0 && (
        <div className="status-msg">Нічого не знайдено за запитом "{query}"</div>
      )}

      <div className="books-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}