import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useBooks } from '../context/BookContext';
import NoteModal from './NoteModal';

export default function BookCard({ book }) {
  const { isFavorite, addToFavorites, removeFromFavorites, updateBookNote } = useBooks();
  const [showModal, setShowModal] = useState(false);
  
  const { id, volumeInfo, userNote } = book;
  
  const title = volumeInfo.title || 'Без назви';
  const authors = volumeInfo.authors?.join(', ') || 'Невідомий автор';
  const thumbnail = volumeInfo.imageLinks?.thumbnail || '';

  const favorite = isFavorite(id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites(book);
    }
  };

  return (
    <>
      <div className="book-card">
        <div className="card-image-wrapper">
          <img src={thumbnail} alt={title} className="card-image" />
        </div>
        <div className="card-content">
          <h3 className="book-title">{title}</h3>
          <p className="book-authors">{authors}</p>
          {favorite && userNote && (
            <div className="book-note-preview">
              📝 {userNote}
            </div>
          )}

          <div className="card-actions">
            <Link to={`/book/${id}`} className="btn btn-outline">
              Детальніше
            </Link>
            
            {favorite && (
              <button 
                className="btn btn-outline" 
                onClick={() => setShowModal(true)}
                title="Додати нотатку"
                style={{ marginLeft: 'auto', marginRight: '10px' }}
              >
                ✎
              </button>
            )}

            <button 
              className={`btn-fav ${favorite ? 'active' : ''}`}
              onClick={handleFavoriteClick}
              title={favorite ? "Видалити з обраного" : "Додати в обране"}
            >
              ★
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <NoteModal 
          book={book} 
          onClose={() => setShowModal(false)} 
          onSave={updateBookNote} 
        />
      )}
    </>
  );
}