import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './Pages/HomePage';
import CartPage from './Pages/CartPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ProductDetails from './produits/ProductDetails';
import CategoryProducts from './Pages/CategoryProducts';
import ProfilePage from './Pages/ProfilePage';
import RecherchePage from './Pages/RecherchePage';
import OrdersPage from './Pages/OrdersPage';
import PaiementPaypal from './produits/PaiementPaypal';
import Confirmation from './produits/Confirmation';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';

const PAYPAL_CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID;

function App() {
  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/panier" element={<CartPage />} />
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/category/:id" element={<CategoryProducts />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/recherche" element={<RecherchePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/PaiementPaypal" element={<PaiementPaypal />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
        <Footer />
      </Router>
    </PayPalScriptProvider>
  );
}

export default App;
