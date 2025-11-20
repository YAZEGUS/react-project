import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="app-container">
      <Navbar />
      
      <main className="main-content">
        {children}
      </main>
      
      <footer style={{
        textAlign: 'center', 
        padding: '1.5rem', 
        color: '#64748b',
        borderTop: '1px solid #e2e8f0',
        marginTop: 'auto'
      }}>
        <p>© 2025 BookLibrary SPA Project. Всі права захищено.</p>
      </footer>
    </div>
  );
}