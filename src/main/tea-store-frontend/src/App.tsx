import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductSpotlight from './components/ProductSpotlight';

const App: React.FC = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductSpotlight />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
