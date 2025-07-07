import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';
import RecommendedProducts from './RecommendedProducts';
import ProductReview from '../components/ProductReview';
import { Helmet } from 'react-helmet';
import RecentlyViewed from './RecentlyViewed';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [popupProduct, setPopupProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        axios.defaults.baseURL = process.env.REACT_APP_API_URL;
        const response = await axios.get(`/products/${id}`);
        const data = response.data;
        setProduct(data);
        const viewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
        if (!viewed.includes(data.id)) {
          viewed.push(data.id);
          localStorage.setItem('recentlyViewed', JSON.stringify(viewed.slice(-20)));
        }

        if (data.images?.length > 0) {
          setMainImage(`${process.env.REACT_APP_IMAGE_URL}/${data.images[0].url}`);
        }

        const token = localStorage.getItem('token');
        if (token) {
          await axios.post(`/product-view/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }
      } catch (error) {
     
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product || !product.variants) return;

    const variant = product.variants.find(v =>
      (!v.couleur || v.couleur === selectedColor) &&
      (!v.taille || v.taille === selectedSize)
    );

    if (variant) {
      setSelectedVariant(variant);
      if (variant.image) {
        setMainImage(`${process.env.REACT_APP_IMAGE_URL}/${variant.image}`);
      }
    }
  }, [selectedColor, selectedSize, product]);

  const couleursDispo = [...new Set(product?.variants?.map(v => v.couleur))].filter(Boolean);
  const taillesDispo = [...new Set(product?.variants?.map(v => v.taille))].filter(Boolean);

  const addToCart = async () => {


    if (product?.variants?.length > 0) {
      const requireColor = product.variants.some(v => v.couleur);
      const requireSize = product.variants.some(v => v.taille);
      if ((requireColor && !selectedColor) || (requireSize && !selectedSize)) {
        alert("Veuillez choisir une couleur ou une taille.");
        return;
      }
    }

    const token = localStorage.getItem('token');
    const finalVariant = product.variants?.find(v =>
      (v.couleur ? v.couleur === selectedColor : true) &&
      (v.taille ? v.taille === selectedSize : true)
    );
    
    const variantImage = finalVariant?.image
      ? `${process.env.REACT_APP_IMAGE_URL}/${finalVariant.image}`
      : (product.images[0] ? `${process.env.REACT_APP_IMAGE_URL}/${product.images[0].url}` : '');

    const variantPrice = finalVariant?.price || product.price;

    if (!token) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const index = cart.findIndex(item =>
        item.id === product.id &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
      );

      if (index !== -1) {
        cart[index].quantity += quantity;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          quantity,
          selectedColor,
          selectedSize,
          image: variantImage,
          variantId: finalVariant?.id || null,
          price: variantPrice, 
          variant: {
            taille: selectedSize,
            prix: variantPrice
          }
        });
        

      }

      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      try {
        await axios.post('/cart/items', {
          product_id: product.id,
          quantity,
          selected_size: selectedSize,
          selected_color: selectedColor,
          variant_id: finalVariant?.id || null,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          },
        });
        
      } catch (err) {
   
        alert("Erreur lors de l'ajout au panier.");
        return;
      }
    }

    setPopupProduct({
      name: product.name,
      size: selectedSize,
      color: selectedColor,
      price: variantPrice,
      image: variantImage,
    });

    setShowPopup(true);
  };
  
  const handleAcheterMaintenant = async () => {
    if (product?.variants?.length > 0) {
      const requireColor = product.variants.some(v => v.couleur);
      const requireSize = product.variants.some(v => v.taille);
      if ((requireColor && !selectedColor) || (requireSize && !selectedSize)) {
        alert("Veuillez choisir une couleur ou une taille.");
        return;
      }
    }
  
    const finalVariant = product.variants?.find(v =>
      (v.couleur ? v.couleur === selectedColor : true) &&
      (v.taille ? v.taille === selectedSize : true)
    );
  
    const variantImage = finalVariant?.image
      ? `${process.env.REACT_APP_IMAGE_URL}/${finalVariant.image}`
      : (product.images[0] ? `${process.env.REACT_APP_IMAGE_URL}/${product.images[0].url}` : '');
  
    const variantPrice = finalVariant?.price || product.price;
  
    const produit = {
      id: product.id,
      name: product.name,
      quantity,
      selectedColor,
      selectedSize,
      image: variantImage,
      variantId: finalVariant?.id || null,
      price: variantPrice,
    };
  
    let acheterMaintenantListRaw = localStorage.getItem('acheterMaintenant');
    let acheterMaintenantList = [];
  
    try {
      acheterMaintenantList = JSON.parse(acheterMaintenantListRaw);
      if (!Array.isArray(acheterMaintenantList)) {
        acheterMaintenantList = [];
      }
    } catch {
      acheterMaintenantList = [];
    }
  
    const exists = acheterMaintenantList.some(item =>
      item.id === produit.id &&
      item.selectedColor === produit.selectedColor &&
      item.selectedSize === produit.selectedSize
    );
  
    if (!exists) {
      acheterMaintenantList.push(produit);
    }
  
    localStorage.setItem('acheterMaintenant', JSON.stringify(acheterMaintenantList));
  
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.post('/cart/items', {
          product_id: product.id,
          quantity,
          selected_size: selectedSize,
          selected_color: selectedColor,
          variant_id: finalVariant?.id || null,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        });
      } catch (err) {
       
        alert("Erreur lors de l'ajout au panier.");
        return;
      }
    }
  
    navigate('/orders');
  };
  
  if (!product) return <div className="empty-message">Produit introuvable</div>;
  const handleVoirPanier = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/connexion'); 
    } else {
      navigate('/panier');
    }
  };
  
  const handleCommander = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/connexion'); 
    } else {
      navigate('/orders');
    }
  };
  

  return (
    <>
      <Helmet>
        <title>{product.name} – Nourritures des Fidèles</title>
        <meta name="description" content={product.description?.slice(0, 160) || "Produit pour animaux."} />
        <link rel="canonical" href={`https://nourrituredesfideles.ma/ppd/product/${product.id}`} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description?.slice(0, 160) || "Produit pour animaux."} />
        <meta property="og:image" content={`${process.env.REACT_APP_IMAGE_URL}/${product.images?.[0]?.url}`} />
        <meta property="og:url" content={`https://nourrituredesfideles.ma/ppd/product/${product.id}`} />
        <meta property="og:type" content="product" />
      </Helmet>

      <div className="product-details-container">
        <div className="detail-image-section">
          {mainImage && <img src={mainImage} alt={product.name} className="detail-image" />}
          <div className="image-gallery">
            {product.images?.map((img, idx) => {
              const url = `${process.env.REACT_APP_IMAGE_URL}/${img.url}`;
              return (
                <img
                  key={idx}
                  src={url}
                  alt={`thumb-${idx}`}
                  className={`thumb ${mainImage === url ? 'active' : ''}`}
                  onClick={() => setMainImage(url)}
                />
              );
            })}
          </div>
        </div>

        <div className="detail-info">
          <h2>{product.name}</h2>
          <div className="price-promo-wrap">
            <span className="new-priceee">
              {parseFloat(selectedVariant?.price || product.price || 0).toFixed(2)} Dhs
            </span>
          </div>

          {couleursDispo.length > 0 && (
            <div className="color-section">
              <h4>Couleur :</h4>
              <div className="color-options">
                {couleursDispo.map((color, i) => (
                  <button
                    key={i}
                    className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {taillesDispo.length > 0 && (
            <div className="taille-section">
              <h4>Taille :</h4>
              <div className="taille-options">
                {taillesDispo.map((taille, i) => (
                  <button
                    key={i}
                    className={`taille-btn ${selectedSize === taille ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(taille)}
                  >
                    {taille}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="quantity-section">
            <span>Quantité</span>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          <div className="stock-info">
            <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
              Disponibilité : {product.stock > 0 ? 'En stock' : 'Rupture de stock'}
            </span>
          </div>

          {product.stock > 0 && product.stock <= 5 && (
            <>
              <div className="stock-alert">
                Dépêchez-vous ! Plus que <strong>{product.stock}</strong> en stock
              </div>
              <div className="stock-bar-container">
                <div className="stock-bar" style={{ width: `${Math.min((product.stock / 10) * 100, 100)}%` }}></div>
              </div>
            </>
          )}

          <div className="button-actions">
            <button className="add-to-cart" onClick={addToCart}>Ajouter au panier</button>
            <button className="buy-now" onClick={handleAcheterMaintenant}>Acheter maintenant</button>

          </div>

          <div className="product-description">
            <h3>Description :</h3>
            <div className="product-description-content" dangerouslySetInnerHTML={{ __html: product.description || "Aucune description disponible." }} />
          </div>
        </div>
      </div>

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
                {popupProduct.color && <p>Couleur: {popupProduct.color}</p>}
                {popupProduct.size && <p>Taille: {popupProduct.size}</p>}
                <p>Prix: {parseFloat(popupProduct.price || 0).toFixed(2)} Dhs</p>
              </div>
            </div>
            <div className="popup-actions">
            <button onClick={handleVoirPanier} className="popup-btn-full">Voir le panier</button>

            <button onClick={handleCommander} className="popup-btn-secondary">Procéder au paiement</button>

            </div>
            <button className="popup-link" onClick={() => setShowPopup(false)}>Continuer les achats</button>
          </div>
        </>
      )}

      <ProductReview productId={id} />
      <RecommendedProducts productId={product.id} title="Produits similaires" />
      <RecentlyViewed title="Articles également consultés" />
    </>
  );
};

export default ProductDetails;
