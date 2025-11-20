import { NavLink } from 'react-router-dom';

export default function Navbar() {
  // Helper для класів активного посилання
  const getLinkClass = ({ isActive }) => 
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      <div className="container">
        <NavLink to="/" className="nav-brand">
          📚 BookLibrary
        </NavLink>
      </div>
      <div className="nav-links">
        <NavLink to="/" className={getLinkClass} end>
          Пошук
        </NavLink>
        <NavLink to="/favorites" className={getLinkClass}>
          Моя полиця
        </NavLink>
      </div>
    </nav>
  );
}