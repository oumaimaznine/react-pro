import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';
import RecommendedProducts from './RecommendedProducts';
import ProductReview from '../components/ProductReview';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [popupProduct, setPopupProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = 'http://localhost:8000';

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        const data = response.data;
        setProduct(data);

        if (data.images && data.images.length > 0) {
          setMainImage(`http://127.0.0.1:8000/${data.images[0].url}`);
        }
      } catch (error) {
        console.error('Erreur lors du chargement du produit:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Vous devez être connecté pour ajouter au panier.');
        return;
      }

      await axios.post('/api/cart/items', {
        product_id: product.id,
        quantity: quantity,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }
      });

      setPopupProduct({
        name: product.name,
        size: product.size,
        image: product.images[0] ? `http://127.0.0.1:8000/${product.images[0].url}` : '',
      });
      setShowPopup(true);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      alert("Erreur lors de l'ajout au panier.");
    }
  };

  if (!product) {
    return <div className="empty-message">Produit introuvable</div>;
  }

  return (
    <>
      <div className="product-details-container">
        <div className="detail-image-section">
          {mainImage && (
            <img src={mainImage} alt={product.name} className="detail-image" />
          )}

          <div className="image-gallery">
            {product.images && product.images.map((img, idx) => (
              <img
                key={idx}
                src={`http://127.0.0.1:8000/${img.url}`}
                alt={`thumbnail-${idx}`}
                className={`thumb ${mainImage === `http://127.0.0.1:8000/${img.url}` ? 'active' : ''}`}
                onClick={() => setMainImage(`http://127.0.0.1:8000/${img.url}`)}
              />
            ))}
          </div>
        </div>

        <div className="detail-info">
          <h2 className="product-title">{product.name}</h2>
          <p className="price">{product.price} Dh</p>

          <div className="quantity-section">
            <span>Quantité</span>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          <div className="button-actions">
            <button className="add-to-cart" onClick={addToCart}>Ajouter au panier</button>
            <button className="buy-now" onClick={() => navigate('/orders')}>
  Acheter maintenant
</button>

          </div>

          <div className="product-description">
            <h3>Description :</h3>
            <div
              className="product-description-content"
              dangerouslySetInnerHTML={{ __html: product.description || "Aucune description disponible." }}
            ></div>
          </div>
        </div>
      </div>
      {showPopup && popupProduct && (
  <div className="cart-popup-large">
    <span className="close-btn" onClick={() => setShowPopup(false)}>×</span>
    <p className="popup-title">Article ajouté au panier</p>

    <div className="popup-row">
      <img src={popupProduct.image} alt={popupProduct.name} className="popup-image-large" />
      <div className="popup-info">
        <strong>{popupProduct.name}</strong>
        <p>Taille: {popupProduct.size || "Standard"}</p>
      </div>
    </div>

    <button className="popup-btn-full" onClick={() => navigate('/panier')}>Voir le panier</button>
    <button className="popup-btn-secondary" onClick={() => navigate('/orders')}>Procéder au paiement</button>
    <button className="popup-link" onClick={() => setShowPopup(false)}>Continuer les achats</button>
  </div>
)}
<ProductReview productId={id} />

<RecommendedProducts
  productId={product.id}
  title="Articles également consultés"
/>

    </>
   
  );
};

export default ProductDetails;
