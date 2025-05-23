import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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





import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

const PAYPAL_CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID;

function App() {
  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
      <Router>
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
              <Route path="/panier" element={<CartPage />} />
              <Route path="/category/:id" element={<CategoryProducts />} />
              <Route path="/promo" element={<PromoPage />} />
              <Route path="/verify-email-pending" element={<VerifyEmailPending />} />
              <Route path="/email-verified" element={<EmailVerified />} />
              <Route path="/contact" element={<ContactPage/>}/>

              {/* === Routes privées === */}
              <Route path="/profil" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
              <Route path="/orders" element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
              <Route path="/PaiementPaypal" element={<PrivateRoute><PaiementPaypal /></PrivateRoute>} />
              <Route path="/PaiementLivraison" element={<PrivateRoute><PaiementLivraison /></PrivateRoute>} />
              <Route path="/confirmation" element={<PrivateRoute><Confirmation /></PrivateRoute>} />
              <Route path="/paiement-stripe" element={<PrivateRoute><PaiementStripe /></PrivateRoute>} />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </PayPalScriptProvider>
  );
}

export default App;
