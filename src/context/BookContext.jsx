import { createContext, useState, useEffect, useContext } from 'react';

// 1. Створення контексту
const BookContext = createContext();

// 2. Провайдер даних
export const BookProvider = ({ children }) => {
  // Ініціалізація стану з LocalStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('bookLibrary_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Ефект для синхронізації з LocalStorage при кожній зміні
  useEffect(() => {
    localStorage.setItem('bookLibrary_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Додавання до обраного
  const addToFavorites = (book) => {
    setFavorites((prev) => {
      if (prev.find((b) => b.id === book.id)) return prev;
      return [...prev, { ...book, userNote: '' }];
    });
  };

  // Видалення з обраного
  const removeFromFavorites = (bookId) => {
    setFavorites((prev) => prev.filter((book) => book.id !== bookId));
  };

  const updateBookNote = (bookId, newNote) => {
    setFavorites((prev) => 
      prev.map((book) => 
        book.id === bookId ? { ...book, userNote: newNote } : book
      )
    );
  };

  // Перевірка, чи є книга в обраному
  const isFavorite = (bookId) => {
    return favorites.some((b) => b.id === bookId);
  };

  return (
    <BookContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, updateBookNote }}>
      {children}
    </BookContext.Provider>
  );
};

// 3. Кастомний хук для зручного доступу
export const useBooks = () => {
  return useContext(BookContext);
};