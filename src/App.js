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
import  EditProfilePage from'./produits/EditProfilePage';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cartPage" element={<CartPage />} />
        <Route path="/connexion" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route path="/ProfilePage" element={<ProfilePage/>} />
        <Route path="/ EditProfilePage" element={< EditProfilePage/>}/>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
