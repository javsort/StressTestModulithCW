import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import Header from './components/Header';

const App: React.FC = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<ProductsPage />} />
    </Routes>
  </Router>
);

export default App;
