import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Search from '../pages/Search';
import { BookService } from '../services/api';
import * as BookContext from '../context/BookContext';

// Мокаємо сервіс API
vi.mock('../services/api', () => ({
  BookService: {
    searchBooks: vi.fn(),
  },
}));

// Налаштування контексту для тестів
const setupContext = () => {
  vi.spyOn(BookContext, 'useBooks').mockReturnValue({
    isFavorite: () => false,
    addToFavorites: vi.fn(),
    removeFromFavorites: vi.fn(),
  });
};

describe('Search Page Integration', () => {
  beforeEach(() => {
    setupContext();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders initial state correctly', () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    
    // Перевіряємо наявність заголовка та інпуту
    expect(screen.getByText(/Знайдіть свою наступну книгу/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Назва книги, автор.../i)).toBeInTheDocument();
  });

  it('displays loading state during API fetch', async () => {
    BookService.searchBooks.mockReturnValue(new Promise(() => {}));

    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Завантаження бібліотеки.../i)).toBeInTheDocument();
  });

  it('displays books list after successful fetch', async () => {
    const mockBooks = [
      { id: '1', volumeInfo: { title: 'React Basics', authors: ['Dan'] } },
      { id: '2', volumeInfo: { title: 'Clean Code', authors: ['Bob'] } },
      { id: '3', volumeInfo: { title: 'Jest Testing', authors: ['Kent'] } },
      { id: '4', volumeInfo: { title: 'Vite Guide', authors: ['Evan'] } },
      { id: '5', volumeInfo: { title: 'JS Patterns', authors: ['Addy'] } },
    ];

    BookService.searchBooks.mockResolvedValue(mockBooks);

    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    // Чекаємо, поки зникне лоадер і з'являться книги
    await waitFor(() => {
      expect(screen.queryByText(/Завантаження/i)).not.toBeInTheDocument();
    });

    // Перевіряємо, що відрендерилось 5 книг
    expect(screen.getAllByText(/Детальніше/i)).toHaveLength(5);
    expect(screen.getByText('React Basics')).toBeInTheDocument();
  });

  it('displays error message on API failure', async () => {
    // Імітуємо помилку
    BookService.searchBooks.mockRejectedValue(new Error('API Fail'));

    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Не вдалося отримати список книг/i)).toBeInTheDocument();
    });
  });

  it('updates list when user searches for a new term', async () => {
    BookService.searchBooks.mockResolvedValue([]); // Спочатку порожньо
    
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/Назва книги, автор.../i);
    const button = screen.getByText('Пошук');

    // Вводимо нове значення
    fireEvent.change(input, { target: { value: 'New Query' } });
    fireEvent.click(button);

    // Перевіряємо, чи викликався сервіс з новим запитом
    await waitFor(() => {
      expect(BookService.searchBooks).toHaveBeenCalledWith('New Query');
    });
  });
});