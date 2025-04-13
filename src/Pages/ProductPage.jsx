import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductPage.css';

const sampleProducts = [
  { id: 1, name: 'Croquettes pour chien', price: 100, description: 'Des croquettes saines et équilibrées pour votre chien.', category: 'Alimentation', image: '/cro.jpg' },
  { id: 2, name: 'Jouet pour chat', price: 150, description: 'Un jouet interactif pour votre chat.', category: 'Jouets', image: '/jouetchat.jpg' },
  { id: 3, name: 'Collier pour chien', price: 80, description: 'Collier robuste et confortable pour votre chien.', category: 'Accessoires', image: '/colier (3).jpg' },
  { id: 4, name: 'Laisse pour chien', price: 60, description: 'Une laisse résistante pour les promenades de votre chien.', category: 'Accessoires', image: '/ll.jpg' },
  { id: 5, name: 'Croquettes pour chat', price: 270, description: 'Des croquettes saines et équilibrées pour votre chat.', category: 'Alimentation', image: '/crochat.jpg' },
  { id: 6, name: 'Jouet pour chat', price: 60, description: 'Un jouet interactif pour votre chat.', category: 'Jouets', image: '/cht.jpg' },
  { id: 7, name: 'Litière pour chat', price: 18, description: 'Litière absorbante et confortable pour votre chat.', category: 'Accessoires', image: '/22.jpg' },
  { id: 8, name: 'Panier pour chien', price: 35, description: 'Panier confortable pour que votre chien se repose.', category: 'Accessoires', image: '/panier.jpg' },
  { id: 9, name: 'Shampooing pour chien', price: 12, description: 'Shampooing doux pour la peau de votre chien.', category: 'Accessoires', image: '/sha.jpg' },
  { id: 10, name: 'Lit pour chat', price: 25, description: 'Lit douillet pour que votre chat se repose confortablement.', category: 'Accessoires', image: '/lit.jpg' },
  { id: 11, name: 'Bac à litière', price: 15, description: 'Bac à litière facile à nettoyer pour votre chat.', category: 'Accessoires', image: '/aaa.jpg' },
  { id: 12, name: 'Fontaine à eau pour animaux', price: 30, description: 'Fontaine à eau pour animaux afin de garantir une bonne hydratation.', category: 'Accessoires', image: '/111.jpg' },
  { id: 13, name: 'Manteau pour chien', price: 30, description: 'Manteau imperméable pour votre chien en extérieur.', category: 'Vêtements', image: '/mon.jpg' },
  { id: 14, name: 'Manteau pour chat', price: 25, description: 'Un manteau doux et confortable pour garder votre chat au chaud pendant l\'hiver.', category: 'Vêtements', image: '/kk.jpg' },
  { id: 15, name: 'Bonnet pour chat', price: 12, description: 'Un bonnet mignon pour protéger la tête de votre chat.', category: 'Vêtements', image: '/ban.jpg' },
];

const ProductPage = () => {
  const [products] = useState(sampleProducts);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  const filteredProducts = products.filter(product => {
    return (
      (categoryFilter === '' || product.category === categoryFilter) &&
      (priceFilter === '' || (priceFilter === 'low' ? product.price < 270 : product.price >= 12))
    );
  });

  return (
    <div className="product-page">
      <div className="filters">
        <select onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter}>
          <option value="">Toutes les catégories</option>
          <option value="Alimentation">Alimentation</option>
          <option value="Accessoires">Accessoires</option>
          <option value="Jouets">Jouets</option>
          <option value="Vêtements">Vêtements</option>
        </select>
        <select onChange={(e) => setPriceFilter(e.target.value)} value={priceFilter}>
          <option value="">Tous les prix</option>
          <option value="low">Moins de 270DH</option>
          <option value="high">Plus de 12DH</option>
        </select>
      </div>

      <div className="product-list">
        {filteredProducts.map((product) => (
          <div className="product" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Prix: {product.price}DH</p>
            <Link to={`/produits/DH{product.id}`} className="btn-secondary">Voir le produit</Link>
            <button className="btn-add-to-cart">Ajouter au panier</button>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
