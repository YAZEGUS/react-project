const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const BookService = {
  searchBooks: async (query) => {
    if (!query) return [];
    try {
      const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(query)}&maxResults=12`);
      if (!response.ok) throw new Error('Помилка мережі');
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  getBookById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      if (!response.ok) throw new Error('Книгу не знайдено');
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }
};