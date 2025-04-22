// Importation des hooks et styles
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Pour naviguer entre les pages sans recharger
import './AlimentationPage.css'; 
;
 // Fichier de styles associé

//  Création d'un tableau de 152 produits fictifs avec des propriétés générées dynamiquement
const products = Array.from({ length: 152}, (_, index) => ({
  id: index + 1, // Identifiant unique pour chaque produit (de 1 à 15)
  name: `Produit ${index + 1}`, // Nom du produit : Produit 1, Produit 2, etc.
  price: `À partir de ${(20 + (index + 1) * 3.5).toFixed(2)} Dhs`, // Prix calculé dynamiquement
  image: `/images/produit${index + 1}.jpg`, // Chemin vers l’image du produit
  isPromo: (index + 1) % 5 === 0, // Chaque 5e produit est en promotion (ex: 5, 10, 15...)
}));
const itemsPerPage = 20; // Nombre de produits affichés par page

// Déclaration du composant ProductList
const ProductList = () => {
  // useState pour gérer le numéro de la page actuelle (commence à 1)
  const [currentPage, setCurrentPage] = useState(1);

  //  Calcul du nombre total de pages nécessaires
  const totalPages = Math.ceil(products.length / itemsPerPage); // Ex: 30 produits / 20 par page = 2 pages

  //  Détermination de l’index du premier produit à afficher
  const startIndex = (currentPage - 1) * itemsPerPage;

  //  Sélection des produits à afficher pour la page actuelle
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  //  Fonction appelée quand on clique sur un numéro de page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // On met à jour la page affichée
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Chats</h2>

      {/* Grille d'affichage des cartes de produits */}
      <div className="product-grid">
        {currentProducts.map((product) => (
          //  Chaque carte est un lien vers la page de détails du produit (ex: /product/5)
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="product-card"
          >
            {/*  Image du produit */}
            <img src={product.image} alt={product.name} className="product-image" />

            {/*  Nom du produit */}
            <h3 className="product-name">{product.name}</h3>

            {/*  Prix du produit */}
            <p className="product-price">{product.price}</p>

            {/*  Badge "Promotion" si le produit est en promo */}
            {product.isPromo && <span className="promo-badge">Promotion</span>}
          </Link>
        ))}
      </div>

      {/* Boutons de pagination (1, 2, ...) */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1} // Clé unique pour chaque bouton
            className={currentPage === i + 1 ? 'active' : ''} // Class "active" si c'est la page actuelle
            onClick={() => handlePageChange(i + 1)} // Clic change la page
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList; // Exportation du composant
