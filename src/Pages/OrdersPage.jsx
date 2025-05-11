

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaPaypal, FaTruck } from 'react-icons/fa';
import 'react-phone-input-2/lib/style.css';

import './OrdersPage.css';

function OrdersPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    prenom: '', nom: '', email: '', tel: '', adresse: '',
    region: '', ville: '', code_postal: '', country: 'Maroc',
    saveInfo: false, paymentMethod: ''
  });

  const [adresseExiste, setAdresseExiste] = useState(false);
  const [adresseData, setAdresseData] = useState(null);
  const [cartStats, setCartStats] = useState({ totalItems: 0, totalPrice: 0 });
  const [cartItems, setCartItems] = useState([]);
  const [showPaypalModal, setShowPaypalModal] = useState(false);
  const [showCODModal, setShowCODModal] = useState(false);
  const [showAdresseModal, setShowAdresseModal] = useState(false);
  const [loading, setLoading] = useState(false);


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
  const saveAddressIfNeeded = async () => {
    if (!formData.paymentMethod || adresseExiste) return;

    const token = localStorage.getItem('token');
    const payload = {
      first_name: formData.prenom,
      last_name: formData.nom,
      email: formData.email,
      phone: formData.tel,
      address: formData.adresse,
      region: formData.region,
      city: formData.ville,
      postal_code: formData.code_postal,
      country: formData.country,
      payment_method: formData.paymentMethod,
      save_info: formData.saveInfo
    };

    try {
      await axios.post('http://127.0.0.1:8000/api/address', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAdresseExiste(true);
      console.log("Adresse enregistrée automatiquement.");
    } catch (err) {
      console.error("Erreur enregistrement adresse:", err.response?.data || err.message);
    }
  };

  saveAddressIfNeeded();
}, [formData.paymentMethod]);

  useEffect(() => {
    if (formData.paymentMethod === 'paypal') {
      setShowPaypalModal(true); 
    } else {
      setShowPaypalModal(false); 
    }
  }, [formData.paymentMethod]);
  useEffect(() => {
    if (formData.paymentMethod === 'cod') {
      setShowCODModal(true); 
    } else {
      setShowCODModal(false); 
    }
  }, [formData.paymentMethod]);
  

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/address', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        setAdresseExiste(true);
        setAdresseData(data);
        setFormData(prev => ({ ...prev, ...data }));
      } catch (error) {
        setAdresseExiste(false);
      }
    };
    fetchAddress();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
  
    const token = localStorage.getItem('token');
    const payload = {
      first_name: formData.prenom,
      last_name: formData.nom,
      email: formData.email,
      phone: formData.tel,
      address: formData.adresse,
      region: formData.region,
      city: formData.ville,
      postal_code: formData.code_postal,
      country: formData.country,
      payment_method: formData.paymentMethod,
      save_info: formData.saveInfo
    };
  
    try {
      if (adresseExiste) {
        await axios.put('http://127.0.0.1:8000/api/address', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://127.0.0.1:8000/api/address', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setShowAdresseModal(false);
    } catch (error) {
      alert("Erreur Laravel: " + JSON.stringify(error.response?.data));
    } finally {
      setLoading(false); 
    }
  };
  
  

  return (
    <div className="order-container">
      <div className="orders-page">
        {adresseExiste ? (
          <div className="adresse-existante">
            <h3>Adresse enregistrée</h3>
            <div className="carte-adresse">
              <p>{adresseData.first_name} {adresseData.last_name}</p>
              <p>{adresseData.address}</p>
              <p>{adresseData.city}, {adresseData.postal_code}</p>
              <p>{adresseData.country}</p>
              <p>{adresseData.phone}</p>
            </div>
            <button className="changer-adresse" onClick={() => setShowAdresseModal(true)}>
              Modifier l'adresse
            </button>
          </div>
        ) : (
          <div className="client-info-box">
            <h3>1. Les informations clients</h3>
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
              <input name="country" value={formData.country} onChange={handleChange} required />

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
          <div className="validate-order">
          <button type="submit" className="btn-save" disabled={loading}>
  {loading ? 'Enregistrement...' : 'Conserver'}
</button>

</div>

            </form>
          </div>
        )}

        <div className="payment-method-box">
          <h4>2. MÉTHODE DE PAIEMENT</h4>
          <div className="payment-options">
            <label>
              <input type="radio" name="paymentMethod" value="card" onChange={handleChange} checked={formData.paymentMethod === 'card'} />
              <FaCreditCard style={{ color: '#0070ba' }} /> Carte Bancaire
            </label>
            <label>
              <input type="radio" name="paymentMethod" value="paypal" onChange={handleChange} checked={formData.paymentMethod === 'paypal'} />
              <FaPaypal style={{ color: '#003087' }} /> PayPal
            </label>
            <label>
              <input type="radio" name="paymentMethod" value="cod" onChange={handleChange} checked={formData.paymentMethod === 'cod'} />
              <FaTruck style={{ color: '#555' }} /> Paiement à la livraison
            </label>
          </div>
        </div>
      </div>

      <div className="order-summary">
        <h3>Résumé de la commande :</h3>
        {cartItems.map((item, index) => (
          <div className="summary-item" key={index}>
            <img
              src={item.product.images && item.product.images.length > 0 ? `http://127.0.0.1:8000/${item.product.images[0].url}` : 'https://via.placeholder.com/150'}
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
      
      


      {showAdresseModal && (
        <div className="modal-backdrop">
          <div className="profile-modal">
            <h3>Modifier l’adresse</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Prénom</label>
                <input type="text" value={formData.prenom} onChange={(e) => setFormData({ ...formData, prenom: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Nom</label>
                <input type="text" value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Pays</label>
                <select value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })}>
                  <option value="Maroc">Maroc</option>
                  <option value="France">France</option>
                  <option value="USA">USA</option>
                </select>
              </div>
              <div className="form-group">
                <label>Région</label>
                <input type="text" value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Adresse</label>
                <input type="text" value={formData.adresse} onChange={(e) => setFormData({ ...formData, adresse: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Téléphone</label>
                <input type="text" value={formData.tel} onChange={(e) => setFormData({ ...formData, tel: e.target.value })} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Code postal</label>
                <input type="text" value={formData.code_postal} onChange={(e) => setFormData({ ...formData, code_postal: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Ville</label>
                <input type="text" value={formData.ville} onChange={(e) => setFormData({ ...formData, ville: e.target.value })} />
              </div>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowAdresseModal(false)}>Annuler</button>
              <button className="save-btn" onClick={handleSubmit}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {showPaypalModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Paiement par PayPal</h3>
            <p>Connectez-vous à votre compte PayPal.</p>
            <button onClick={() => setShowPaypalModal(false)}>Fermer</button>
            <a href="/PaiementPaypal">Continuer vers PayPal</a>
          </div>
        </div>
      )}

      {showCODModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Paiement à la livraison</h3>
            <p>Vous paierez à la réception.</p>
            <button onClick={() => setShowCODModal(false)}>Fermer</button>
            <button onClick={() => navigate('/PaiementLivraison')}>Continuer</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
