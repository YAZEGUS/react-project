import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="status-msg" style={{ padding: '4rem 1rem' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😕 404</div>
      <h1 style={{ marginBottom: '1rem' }}>Сторінку не знайдено</h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        Схоже, ця книга загубилася десь в архівах бібліотеки.
      </p>
      <Link to="/" className="btn btn-primary">
        Повернутися до пошуку
      </Link>
    </div>
  );
}