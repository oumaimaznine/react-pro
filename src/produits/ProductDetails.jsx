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
      '/images/produit2.jpg',
      '/images/produit3.jpg',
      '/images/produit4.jpg'
    ],
    description: `
     <section className="intro-section">
      <h1>Aliment complet et équilibré pour chats adultes de plus de 1 an - Activité modérée, accès à l’extérieur.</h1>
      <p className="intro-subtext">
      Spécialement conçu pour répondre à tous les besoins nutritionnels de votre chat afin de le maintenir en bonne santé, ROYAL CANIN® Fit 32 convient aux chats adultes âgés de 1 à 7 ans.    Votre chat a besoin d’une nutrition de haute qualité pour répondre à tous les besoins de l’âge adulte, c’est pourquoi ROYAL CANIN® Fit 32 présente un profil nutritionnel optimal contenant un niveau adéquat de nutriments bénéfiques pour aider à maintenir votre chat adulte en bonne santé.   De plus, ROYAL CANIN® Fit 32 est formulé à partir d’une combinaison de nutriments bénéfiques, dont une grande variété de vitamines et de minéraux qui contribuent à soutenir le bon fonctionnement du système urinaire des chats adultes tels que le vôtre.   Grâce à son apport en fibres alimentaires spécifiques, ROYAL CANIN® Fit 32 aide également votre chat à se débarrasser des poils qu’il a pu ingérer, réduisant ainsi de manière considérable l’apparition de boules de poils.</p>
     <h4> BENEFICES :</h4>
      <ul>
        <li>Profil nutritif optimal Pour faire face aux exigences spécifiques de l’âge adulte, les chats ont besoin d’une nutrition de haute qualité. Fit 32 est un aliment complet et équilibré qui contient un niveau optimal de nutriments bénéfiques pour maintenir les chats adultes en bonne santé.</li>
        <li>Poids idéal Teneur adapté en calories pour aider à maintenir le poids idéal des chats adultes.</li>
        <li>Réduction des boules de poils Aide à stimuler l’élimination des poils ingérés grâce à des fibres spécifiques.</li>
        <li>Santé urinaire Formulé pour contribuer à la bonne santé du système urinaire du chat adulte.</li>
      </ul>
    `
  },
  2: { id: 2, name: 'Royal Canin Maxi Adult', price: '305.00 Dhs', images: ['/images/produit2_1.jpg'], description: 'Pour chiens adultes de grande taille.' },
  3: { id: 3, name: 'Royal Canin Mini Adult', price: '190.00 Dhs', images: ['/images/produit3_1.jpg'], description: 'Pour petits chiens adultes.' },
  4: { id: 4, name: 'Royal Canin Maxi Puppy', price: '364.00 Dhs', images: ['/images/produit4_1.jpg'], description: 'Pour chiots de grande taille.' },
  // Ajoute ici les autres produits...
};

const relatedProducts = [
  {
    id: 'r1',
    name: 'Collier clochette rose',
    image: '/images/related1.jpg',
    price: '28.00 Dhs',
    oldPrice: '50.00 Dhs',
  },
  {
    id: 'r2',
    name: 'Pet Lit en peluche',
    image: '/images/related2.jpg',
    price: '200.00 Dhs'
  },
  {
    id: 'r3',
    name: 'Lit pour chat et chien',
    image: '/images/related3.jpg',
    price: '139.00 Dhs',
    oldPrice: '180.00 Dhs',
  },
  {
    id: 'r4',
    name: 'Stefanplast Furbac',
    image: '/images/related4.jpg',
    price: '250.00 Dhs'
  },
  {
    id: 'r5',
    name: 'Bac de couchage',
    image: '/images/related5.jpg',
    price: '189.00 Dhs',
    oldPrice: '239.00 Dhs',
  },
  {
    id: 'r6',
    name: 'Planche à gratter',
    image: '/images/related6.jpg',
    price: '295.00 Dhs',
    oldPrice: '416.00 Dhs',
  }
];

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
          {relatedProducts.map(item => (
            <div key={item.id} className="related-item">
              <img src={item.image} alt={item.name} />
              <p className="related-name">{item.name}</p>
              <p className="related-price">{item.price}</p>
              {item.oldPrice && <p className="old-price">{item.oldPrice}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
