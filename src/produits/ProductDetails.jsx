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
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        const data = response.data;
        setProduct(data);

        if (data.images && data.images.length > 0) {
          setMainImage(`${process.env.REACT_APP_API_URL}/${data.images[0].url}`);
        }
      } catch (error) {
        console.error('Erreur lors du chargement du produit:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      //  Système localStorage
      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
  
      const existingItemIndex = existingCart.findIndex(
        item => item.id === product.id
      );
  
      if (existingItemIndex !== -1) {
    
        existingCart[existingItemIndex].quantity += quantity;
      } else {
      
        existingCart.push({ ...product, quantity });
      }
  
      localStorage.setItem('cart', JSON.stringify(existingCart));
  
      // Popup
      setPopupProduct({
        name: product.name,
        size: product.size,
        image: product.images[0] ? `${process.env.REACT_APP_API_URL}/${product.images[0].url}` : '',
      });
      setShowPopup(true);
      return;
    }
  
    //  Si utilisateur connecté, envoyer au backend
    try {
      await axios.post('/api/cart/items', {
        product_id: product.id,
        quantity,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
  
      setPopupProduct({
        name: product.name,
        size: product.size,
        image: product.images[0] ? `${process.env.REACT_APP_API_URL}/${product.images[0].url}` : '',
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
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          image: [`${process.env.REACT_APP_API_URL}/${product.images?.[0]?.url}`],
          description: product.description || "Produit pour animaux",
          sku: product.id,
          brand: {
            "@type": "Brand",
            name: "Nourritures des Fidèles"
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "MAD",
            price: parseFloat(product.price).toFixed(2),
            availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
          },
        })}
      </script>

      <div className="product-details-container">
        <div className="detail-image-section">
          {mainImage && <img src={mainImage} alt={product.name} className="detail-image" />}

          <div className="image-gallery">
            {product.images && product.images.map((img, idx) => {
              const imageUrl = `${process.env.REACT_APP_API_URL}/${img.url}`;
              return (
                <img
                  key={idx}
                  src={imageUrl}
                  alt={`thumbnail-${idx}`}
                  className={`thumb ${mainImage === imageUrl ? 'active' : ''}`}
                  onClick={() => setMainImage(imageUrl)}
                />
              );
            })}
          </div>
        </div>

        <div className="detail-info">
          <h2 className="product-title">{product.name}</h2>

          <div className="price-promo-wrap">
            {product.is_promo === 1 && product.old_price ? (
              <>
                <span className="old-priceee">{parseFloat(product.old_price).toFixed(2)} Dhs</span>
                <span className="new-priceee">{parseFloat(product.price).toFixed(2)} Dhs</span>
                <span className="promo-badge">Promotion</span>
              </>
            ) : (
              <span className="new-priceee">{parseFloat(product.price).toFixed(2)} Dhs</span>
            )}
          </div>

          <div className="quantity-section">
            <span>Quantité</span>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          {product.reviews_count > 0 && (
            <div className="product-rating-detail">
              {Array.from({ length: 5 }).map((_, index) => (
                <i
                  key={index}
                  className={
                    index < Math.round(product.reviews_avg_rating)
                      ? 'fas fa-star star-filled'
                      : 'far fa-star star-empty'
                  }
                />
              ))}
              <span className="rating-count-detail">({product.reviews_count})</span>
            </div>
          )}


          <div className="button-actions">
            <button className="add-to-cart" onClick={addToCart}>Ajouter au panier</button>
            <button className="buy-now" onClick={() => navigate('/orders')}>Acheter maintenant</button>
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

      {/* Popup Panier */}
      {showPopup && popupProduct && (
        <>
          <div className="cart-popup-backdrop" onClick={() => setShowPopup(false)}></div>
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

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}>
              <button className="popup-btn-full" onClick={() => navigate('/panier')}>
                Voir le panier
              </button>
              <button className="popup-btn-secondary" onClick={() => navigate('/orders')}>
                Procéder au paiement
              </button>
            </div>

            <button className="popup-link" onClick={() => setShowPopup(false)}>
              Continuer les achats
            </button>
          </div>
        </>
      )}

      <ProductReview productId={id} />
      <RecommendedProducts productId={product.id} title="Articles également consultés" />
    </>
  );
};

export default ProductDetails;
