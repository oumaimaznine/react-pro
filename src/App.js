import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Importation du Header
import Footer from './components/Footer'; // Importation du Footer
import HomePage from './Pages/HomePage'; // Page d'accueil
import PagePannier from './Pages/PagePannier'; // Importation de la page Panier
import LoginPage from './Pages/LoginPage'; // Importation de la page Connexion
import RegisterPage from './Pages/RegisterPage';
import AlimentationChats from './produits/AlimentationChats';
import ProductDetails from './produits/ProductDetails';

function App() {
  return (
    <Router>
      {/* Affiche le Header sur toutes les pages */}
      <Header />

      {/* Définir les différentes routes pour naviguer entre les pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* Route pour la page d'accueil */}
        
        <Route path="/panier" element={<PagePannier />} />  {/* Route pour la page Panier */}
        <Route path="/connexion" element={<LoginPage />} />  {/* Route pour la page Connexion */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/alimentationChats" element={<AlimentationChats />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Ajoutez d'autres routes ici */}
      </Routes>

      {/* Affiche le Footer sur toutes les pages */}
      <Footer />
    </Router>
  );
}

export default App;
