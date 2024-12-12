import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductSpotlight from './components/ProductSpotlight';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessfulAdditionPage from './pages/SuccessfullyAddedPage';
import PaymentSuccessfulPage from './pages/PaymentSuccessfulPage';

const App: React.FC = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductSpotlight />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/product/add/successful" element={<SuccessfulAdditionPage />} />
      <Route path="/order/successful" element={<PaymentSuccessfulPage />} />
      <Route path="*" element={<h1> Not found </h1>} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
