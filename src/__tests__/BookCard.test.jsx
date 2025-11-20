import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import BookCard from '../components/BookCard';
import * as BookContext from '../context/BookContext';

// Мок даних книги для тестів
const mockBook = {
  id: '123',
  volumeInfo: {
    title: 'Test Book JS',
    authors: ['Author One', 'Author Two'],
    imageLinks: { thumbnail: 'http://example.com/image.jpg' }
  }
};

// Мок контексту
const mockAddToFavorites = vi.fn();
const mockRemoveFromFavorites = vi.fn();

// Helper для рендеру з необхідними обгортками
const renderWithProviders = (book, isFav = false) => {
  // Підміняємо хук useBooks
  vi.spyOn(BookContext, 'useBooks').mockReturnValue({
    isFavorite: () => isFav,
    addToFavorites: mockAddToFavorites,
    removeFromFavorites: mockRemoveFromFavorites,
  });

  return render(
    <BrowserRouter>
      <BookCard book={book} />
    </BrowserRouter>
  );
};

describe('BookCard Component', () => {
  it('renders book information correctly', () => {
    renderWithProviders(mockBook);

    expect(screen.getByText('Test Book JS')).toBeInTheDocument();
    expect(screen.getByText('Author One, Author Two')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockBook.volumeInfo.imageLinks.thumbnail);
  });

  it('calls addToFavorites when non-favorite star is clicked', () => {
    renderWithProviders(mockBook, false); // Не в обраному

    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    expect(mockAddToFavorites).toHaveBeenCalledWith(mockBook);
  });

  it('calls removeFromFavorites when favorite star is clicked', () => {
    renderWithProviders(mockBook, true); // Вже в обраному

    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    expect(mockRemoveFromFavorites).toHaveBeenCalledWith(mockBook.id);
  });

  // Snapshot тестування (вимога лабораторної)
  it('matches snapshot', () => {
    const { asFragment } = renderWithProviders(mockBook);
    expect(asFragment()).toMatchSnapshot();
  });
});