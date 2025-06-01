// Import des dépendances React, hooks, axios et navigate
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RecommendedProducts.css'; // Style spécifique

// Composant qui affiche les produits recommandés
const RecommendedProducts = ({ productId, cartItems = [], title = "Articles recommandés pour vous" }) => {
  // États pour stocker les produits recommandés
  const [sameCategory, setSameCategory] = useState([]); // produits de même catégorie
  const [alsoBought, setAlsoBought] = useState([]);     // produits achetés ensemble
  const navigate = useNavigate(); // Hook pour navigation dynamique

  // Appel à l’API pour récupérer les recommandations
  useEffect(() => {
    if (!productId) return; // Si aucun ID produit, ne rien faire

    axios.get(`${process.env.REACT_APP_API_URL}/api/recommendations/${productId}`)
      .then((res) => {
        // Remplit les deux listes à partir de la réponse de l’API
        setSameCategory(res.data.same_category || []);
        setAlsoBought(res.data.also_bought || []);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des recommandations:', err);
      });
  }, [productId]);

  // Récupère les IDs des produits déjà dans le panier pour éviter de les afficher en recommandation
  const cartProductIds = cartItems.map(item => item.product.id);

  // Fusionne les deux listes, supprime les doublons et enlève les produits déjà dans le panier
  const mergedList = [...sameCategory, ...alsoBought].filter((product, index, self) =>
    !cartProductIds.includes(product.id) &&                            // exclure produits du panier
    index === self.findIndex(p => p.id === product.id)                // supprimer doublons
  );

  // Fonction de redirection vers la page du produit recommandé
  const handleClick = (id) => {
    navigate(`/product/${id}`); // Redirige vers la page produit
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll vers le haut
  };

  // Affichage des recommandations si la liste n’est pas vide
  return (
    mergedList.length > 0 && (
      <div className="recommended-container">
        <h3 className="recommend-title">{title}</h3>
        <div className="recommended-list">
          {mergedList.map((product) => (
            <div
              key={product.id}
              className="recommended-card"
              onClick={() => handleClick(product.id)}
              style={{ cursor: 'pointer' }}
            >
              {/* Étiquette "Promotion" si le produit est en promo */}
              <img
  src={`${process.env.REACT_APP_API_URL}/${product.images?.[0]?.url}`}
  alt={product.name}
/>

{product.is_promo === 1 && (
  <span className="promo-label">Promotion</span>
)}


              {/* Nom du produit */}
              <p className="product-name">{product.name}</p>

              {/* Affichage des prix (ancien et nouveau si promo) */}
              <div className="price">
                {product.is_promo === 1 && product.old_price && (
                  <span className="old-price">{parseFloat(product.old_price).toFixed(2)} Dhs</span>
                )}
                <span className="new-price">{parseFloat(product.price).toFixed(2)} Dhs</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

// Export du composant
export default RecommendedProducts;
