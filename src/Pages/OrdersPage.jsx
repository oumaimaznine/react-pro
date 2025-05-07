import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaPaypal, FaTruck } from 'react-icons/fa';

import './OrdersPage.css';

function OrdersPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    tel: '',
    adresse: '',
    region: '',
    ville: '',
    pays: '',
    code_postal: '',
    saveInfo: false,
    paymentMethod: ''
  });

  const [cartStats, setCartStats] = useState({ totalItems: 0, totalPrice: 0 });
  const [cartItems, setCartItems] = useState([]);
  const [showPaypalModal, setShowPaypalModal] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
      totalItems += item.quantity;
      totalPrice += parseFloat(item.product.price) * item.quantity;
    });

    setCartStats({ totalItems, totalPrice });
    setCartItems(cart);
  }, []);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/address', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;
        setFormData((prev) => ({ ...prev, ...data }));
      } catch (error) {
        console.error("Erreur lors du chargement de l'adresse:", error.response?.data || error.message);
      }
    };

    fetchAddress();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });

    if (name === 'paymentMethod' && value === 'paypal') {
      setShowPaypalModal(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://127.0.0.1:8000/api/address', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Adresse enregistrée !");
      navigate('/livraison');
    } catch (error) {
      console.error("Erreur:", error.response?.data || error.message);
    }
  };

  return (
    <div className="order-container">
      <div className="orders-page">
        <h3>1.les informations clients </h3>
        <form onSubmit={handleSubmit} className="order-form">
          <div className="form-row">
            <div className="form-group">
              <label>Prénom</label>
              <input name="prenom" value={formData.prenom} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Nom</label>
              <input name="nom" value={formData.nom} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Adresse</label>
              <input name="adresse" value={formData.adresse} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Téléphone mobile</label>
              <input name="tel" value={formData.tel} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Région</label>
              <select name="region" value={formData.region} onChange={handleChange} required>
                <option value="">Grand Casablanca</option>
                <option value="Casablanca-Settat">Casablanca-Settat</option>
              </select>
            </div>
            <div className="form-group">
              <label>Ville</label>
              <select name="ville" value={formData.ville} onChange={handleChange} required>
                <option value="">Sélectionner</option>
                <option value="Casablanca">Casablanca</option>
                <option value="Mohammedia">Mohammedia</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Pays</label>
              <input name="pays" value={formData.pays} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Code postal (facultatif)</label>
              <input name="code_postal" value={formData.code_postal} onChange={handleChange} />
            </div>
          </div>

          <div className="checkbox-save-wrapper">
            <label className="checkbox-save">
              <input type="checkbox" name="saveInfo" checked={formData.saveInfo} onChange={handleChange} />
              Sauvegarder mes coordonnées pour la prochaine fois
            </label>
          </div>

          <h4 style={{ marginTop: '30px' }}>2. MÉTHODE DE PAIEMENT</h4>
          <div className="payment-method">
            <div className="payment-options">
              <label>
                <input type="radio" name="paymentMethod" value="card" onChange={handleChange} checked={formData.paymentMethod === 'card'} />
                <FaCreditCard style={{ color: '#0070ba' }} /> Carte Bancaire
                <div className="payment-description">Paiement sécurisé par carte bancaire.</div>
              </label>
              <label>
                <input type="radio" name="paymentMethod" value="paypal" onChange={handleChange} checked={formData.paymentMethod === 'paypal'} />
                <FaPaypal style={{ color: '#003087' }} /> PayPal
                <div className="payment-description">Payez facilement avec votre compte PayPal.</div>
              </label>
              <label>
                <input type="radio" name="paymentMethod" value="cod" onChange={handleChange} checked={formData.paymentMethod === 'cod'} />
                <FaTruck style={{ color: '#555' }} /> Paiement à la livraison
                <div className="payment-description">Réglez votre commande à la livraison.</div>
              </label>
            </div>
          </div>

          <a href="/" className="return-link">⬅ Retourner à vos achats</a>

          <div className="form-actions">
            <button type="button" className="btn-cancel">Annuler</button>
            <button type="submit" className="btn-save">Enregistrer</button>
          </div>
        </form>
      </div>

      {showPaypalModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Paiement par PayPal</h3>
            <p>Connectez-vous à votre compte PayPal pour finaliser le paiement.</p>
            <button className="btn-close" onClick={() => setShowPaypalModal(false)}>Fermer</button>
            <a href="/PaiementPaypal" className="btn-continue">Continuer vers PayPal</a>
          </div>
        </div>
      )}

      <div className="order-summary">
        <h3>Résumé de la commande :</h3>
        {cartItems.map((item, index) => (
          <div className="summary-item" key={index}>
            <img
              src={item.product.images && item.product.images.length > 0
                ? `http://127.0.0.1:8000/${item.product.images[0].url}`
                : 'https://via.placeholder.com/150'}
              alt={item.product.name}
              className="product-img"
            />
            <div className="summary-info">
              <span className="summary-title">{item.product?.name}</span>
              <span className="summary-price">{parseFloat(item.product?.price || 0).toFixed(2)} MAD</span>
            </div>
          </div>
        ))}

        <div className="promo-code">
          <input type="text" placeholder="code de réduction" />
          <button>Valider</button>
        </div>

        <div className="summary-line">
          <span>Sous-total · {cartItems.length} articles</span>
          <span>{cartStats.totalPrice.toFixed(2)} MAD</span>
        </div>
        <hr />
        <div className="summary-total">
          <span>Total: </span>
          <span>{(cartStats.totalPrice).toFixed(2)} MAD</span>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
