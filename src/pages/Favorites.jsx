import { useBooks } from '../context/BookContext';
import BookCard from '../components/BookCard';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const { favorites } = useBooks();

  if (favorites.length === 0) {
    return (
      <div className="status-msg">
        <h2>Ваша полиця порожня 📚</h2>
        <p>Додайте книги зі сторінки пошуку, щоб створити власну колекцію.</p>
        <Link to="/" className="btn btn-primary" style={{marginTop: '1rem'}}>
          Перейти до пошуку
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Моя колекція ({favorites.length})</h1>
      <div className="books-grid">
        {favorites.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}