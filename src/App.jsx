import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import BookDetails from './pages/BookDetails';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Search />} />    
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;