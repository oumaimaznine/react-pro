import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Importation du Header
import Footer from './components/Footer'; // Importation du Footer
import HomePage from './Pages/HomePage'; // Page d'accueil
import ProductPage from './Pages/ProductPage'; // Page des produits
import PagePannier from './Pages/PagePannier'; // Importation de la page Panier
import ContactPage from './Pages/ContactPage'; // Importation de la page Contact
import LoginPage from './Pages/LoginPage'; // Importation de la page Connexio

function App() {
  return (
    <Router>
      {/* Affiche le Header sur toutes les pages */}
      <Header />

      {/* Définir les différentes routes pour naviguer entre les pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* Route pour la page d'accueil */}
        <Route path="/produits" element={<ProductPage />} />  {/* Route pour la page des produits */}
        <Route path="/panier" element={<PagePannier />} />  {/* Route pour la page Panier */}
        <Route path="/contact" element={<ContactPage />} />  {/* Route pour la page Contact */}
        <Route path="/connexion" element={<LoginPage />} />  {/* Route pour la page Connexion */}

        {/* Ajoutez d'autres routes ici */}
      </Routes>

      {/* Affiche le Footer sur toutes les pages */}
      <Footer />
    </Router>
  );
}

export default App;
