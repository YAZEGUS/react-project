import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookService } from '../services/api';
import { useBooks } from '../context/BookContext';

export default function BookDetails() {
  const { id } = useParams(); // Отримуємо ID з URL
  const navigate = useNavigate();
  const { isFavorite, addToFavorites, removeFromFavorites } = useBooks();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const data = await BookService.getBookById(id);
        setBook(data);
      } catch (err) {
        setError('Не вдалося завантажити деталі книги');
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id]);

  if (loading) return <div className="status-msg">⏳ Завантаження...</div>;
  if (error) return <div className="status-msg error-msg">{error}</div>;
  if (!book) return null;

  const { volumeInfo } = book;
  const thumbnail = volumeInfo.imageLinks?.low || volumeInfo.imageLinks?.thumbnail;
  const favorite = isFavorite(book.id);

  const toggleFavorite = () => {
    if (favorite) removeFromFavorites(book.id);
    else addToFavorites(book);
  };

  return (
    <div className="details-container">
      <div className="details-image">
        <img src={thumbnail} alt={volumeInfo.title} style={{width: '100%', borderRadius: '8px'}} />
      </div>
      <div className="details-info">
        <h1>{volumeInfo.title}</h1>
        <h3>{volumeInfo.authors?.join(', ')}</h3>
        <p className="meta">
          {volumeInfo.publishedDate && <span>📅 {volumeInfo.publishedDate} </span>}
          {volumeInfo.pageCount && <span>📄 {volumeInfo.pageCount} стор.</span>}
        </p>
        
        <div className="actions" style={{margin: '1.5rem 0'}}>
          <button 
            className={`btn ${favorite ? 'btn-outline' : 'btn-primary'}`}
            onClick={toggleFavorite}
          >
            {favorite ? '💔 Видалити з обраного' : '❤️ Додати в обране'}
          </button>
          <button className="btn btn-outline" style={{marginLeft: '10px'}} onClick={() => navigate(-1)}>
            Назад
          </button>
        </div>

        <div className="description">
          <h4>Опис:</h4>
          <div dangerouslySetInnerHTML={{ __html: volumeInfo.description || 'Опис відсутній.' }} />
        </div>
      </div>
    </div>
  );
}