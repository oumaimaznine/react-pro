import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './Pages/HomePage';
import CartPage from './produits/CartPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ProductDetails from './produits/ProductDetails';
import CategoryProducts from './Pages/CategoryProducts';
import ProfilePage from './Pages/ProfilePage';
import RecherchePage from './Pages/RecherchePage';
import OrdersPage from './Pages/OrdersPage';
import PaiementPaypal from './produits/PaiementPaypal';
import Confirmation from './produits/Confirmation';
import PaiementLivraison from './produits/PaiementLivraison';
import FacebookCallback from './produits/FacebookCallback';
import GoogleCallback from './produits/GoogleCallback';
import PaiementStripe from './produits/PaiementStripe';
import PrivateRoute from './components/PrivateRoute';
import PromoPage from './Pages/PromoPage';
import VerifyEmailPending from './produits/VerifyEmailPending';
import EmailVerified from "./produits/EmailVerified";
import ContactPage from './Pages/ContactPage';
import NotFound from './Pages/NotFound';

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const PAYPAL_CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID;

function App() {
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.get('/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
      
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
         
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/connexion'); 
        }
      });
    }
  }, [navigate]); 

  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
      <div className="main-container">
        <Header />
        <div className="content">
          <Routes>
            {/* === Routes publiques === */}
            <Route path="/" element={<HomePage />} />
            <Route path="/connexion" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/recherche" element={<RecherchePage />} />
            <Route path="/login/facebook/callback" element={<FacebookCallback />} />
            <Route path="/google/callback" element={<GoogleCallback />} />
            <Route path="/category/:id" element={<CategoryProducts />} />
            <Route path="/promo" element={<PromoPage />} />
            <Route path="/verify-email-pending" element={<VerifyEmailPending />} />
            <Route path="/email-verified" element={<EmailVerified />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />

            {/* === Routes privées === */}
            <Route path="/profil" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/orders" element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
            <Route path="/PaiementPaypal" element={<PrivateRoute><PaiementPaypal /></PrivateRoute>} />
            <Route path="/PaiementLivraison" element={<PrivateRoute><PaiementLivraison /></PrivateRoute>} />
            <Route path="/confirmation" element={<PrivateRoute><Confirmation /></PrivateRoute>} />
            <Route path="/paiement-stripe" element={<PrivateRoute><PaiementStripe /></PrivateRoute>} />
            <Route path="/panier" element={<CartPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
