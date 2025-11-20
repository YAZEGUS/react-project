import { useState } from 'react';

export default function NoteModal({ book, onClose, onSave }) {
  const [note, setNote] = useState(book.userNote || '');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setNote(e.target.value);
    // Скидаємо помилку при введенні
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Валідація: Перевірка на довжину
    if (note.length > 50) {
      setError(`Текст занадто довгий! (${note.length}/50)`);
      return;
    }

    // 2. Збереження
    onSave(book.id, note);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>📝 Нотатка для "{book.volumeInfo.title}"</h3>
        
        <form onSubmit={handleSubmit}>
          <textarea
            className="note-input"
            value={note}
            onChange={handleChange}
            placeholder="Напишіть свої враження тут..."
            rows="4"
          />
          
          <div className="char-count" style={{ color: note.length > 50 ? 'red' : '#94a3b8' }}>
            {note.length} / 50
          </div>

          {error && <div className="error-msg-small">{error}</div>}

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Скасувати
            </button>
            <button type="submit" className="btn btn-primary">
              Зберегти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}