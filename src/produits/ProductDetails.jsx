import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

const productData = {
  1: {
    id: 1,
    name: 'Royal Canin Fit 32',
    price: '505.00 Dhs',
    images: [
      '/images/produit1.jpg',
      '/images/product2.jpg',
      '/images/product3.jpg',
      '/images/product4.jpg'
    ],
    description: '',
    relatedIds: [1, 2, 4 ] 
  },
  2: {
    id: 2,
    name: 'Brit Care Cat Grain-Free STERILIZED URINARY HEALTH',
    price: '305.00 Dhs',
    images: ['/images/produit2.jpg'],
    description: 'Pour chiens adultes de grande taille.',
    relatedIds: [11 , 12, 13]
  },
  3: {
    id: 3,
    name: 'Royal Canin Mini Adult',
    price: '190.00 Dhs',
    images: ['/images/produit3_1.jpg'],
    description: 'Pour petits chiens adultes.',
    relatedIds: [1, 10]
  },
  4: {
    id: 4,
    name: 'Royal Canin Maxi Puppy',
    price: '364.00 Dhs',
    images: ['/images/produit4_1.jpg'],
    description: 'Pour chiots de grande taille.',
    relatedIds: [2]
  },
  10: {
    id: 10,
    name: 'GimCat Malt Tabs 40g',
    price: '55.00 Dhs',
    images: ['/images/produit10.jpg'],
    description: `
      <div class="product-features-container">
        <ul class="features-list">
          <li>Contient de l'extrait de malt aromatique</li>
          <li>À l'écorce d'orme et aux nutriments essentiels</li>
          <li>Effet positif sur la santé intestinale</li>
          <li>Sans sucres ajoutés</li>
          <li>Utile pour l'alimentation quotidienne</li>
        </ul>
      </div>
    `,
    relatedIds: [2, 3]
  },
  11: {
    id: 11,
    name: 'Brit Care Cat Grain-Free STERILIZED URINARY HEALTH',
    price: '305.00 Dhs',
    images: ['/images/produit11.jpg'],
    description: 'Pour chiens adultes de grande taille.',
    relatedIds: [11 , 12, 13]
  },
  12: {
    id: 12,
    name: 'Brit Care Cat Grain-Free STERILIZED URINARY HEALTH',
    price: '190.00 Dhs',
    images: ['/images/produit12.jpg'],
    description: 'Pour petits chiens adultes.',
    relatedIds: [1, 10]
  },
  13: {
    id: 13,
    name: 'Brit Care Cat Grain-Free STERILIZED URINARY HEALTH',
    price: '364.00 Dhs',
    images: ['/images/produit13.jpg'],
    description: 'Pour chiots de grande taille.',
    relatedIds: [2]
  },
};

const ProductDetails = () => {
  const { id } = useParams();
  const product = productData[parseInt(id)];
  const [mainImage, setMainImage] = useState(product?.images[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) return <div>Produit introuvable</div>;

  return (
    <div className="product-details-container">
      <div className="detail-image-section">
        <img src={mainImage} alt={product.name} className="detail-image" />
        <div className="image-gallery">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumbnail-${idx}`}
              className={`thumb ${mainImage === img ? 'active' : ''}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      <div className="detail-info">
        <h2>{product.name}</h2>
        <p className="price">{product.price}</p>

        <div className="quantity-section">
          <span>Quantité</span>
          <div className="quantity-controls">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>
        </div>

        <button className="add-to-cart">Ajouter au panier</button>
        <button className="buy-now">Acheter maintenant</button>

        <div
          className="product-description"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>

      <div className="related-products">
        <h3>Les clients ayant consulté cet article ont également regardé</h3>
        <div className="related-grid">
        {product.relatedIds && product.relatedIds.map(relatedId => {
  const related = productData[relatedId];
  if (!related) return null;

  return (
    <div key={related.id} className="related-item">
      <img src={related.images?.[0]} alt={related.name} />
      <p className="related-name">{related.name}</p>
      <p className="related-price">{related.price}</p>
    </div>
  );
})}

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
