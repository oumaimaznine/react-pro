import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ProductPage from './ProductPage'; // Assure-toi que ProductPage est bien importé

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* Page d'accueil */}
        <Route path="/produits" element={<ProductPage />} /> {/* Page produits */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
