import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { FaHome, FaEnvelope } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showUpdateAddressModal, setShowUpdateAddressModal] = useState(false);

  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('ma');
  const [region, setRegion] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/connexion');

        const response = await axios.get('http://127.0.0.1:8000/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(response.data);
        const [prenom, nom] = response.data.name.split(' ');
        setFirstName(prenom || '');
        setLastName(nom || '');
      } catch (error) {
        console.error("Erreur:", error);
        localStorage.clear();
        navigate('/connexion');
      }
    };

    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://127.0.0.1:8000/api/address', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserAddress(res.data);
      } catch (error) {
        setUserAddress(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchAddress();
  }, [navigate]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const updatedName = `${firstName} ${lastName}`;

      await axios.put('http://127.0.0.1:8000/api/user', {
        name: updatedName,
        email: profile.email
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile((prev) => ({ ...prev, name: updatedName }));
      setShowModal(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleAddAddress = async () => {
    if (!ville.trim()) {
      alert("Veuillez remplir le champ Ville !");
      return;
    }

    try {
      const token = localStorage.getItem('token');

      await axios.post('http://127.0.0.1:8000/api/address', {
        first_name: prenom,
        last_name: nom,
        address: adresse,
        city: ville,
        postal_code: codePostal,
        country,
        phone,
        region,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Adresse ajoutée avec succès !");
      setShowAddressModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Erreur axios complète:", error);
      alert("Erreur: " + (error.response?.data?.message || error.message));
    }
  };

  const handleUpdateAddress = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://127.0.0.1:8000/api/address', {
        first_name: prenom,
        last_name: nom,
        address: adresse,
        city: ville,
        postal_code: codePostal,
        country,
        phone,
        region,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Adresse mise à jour avec succès !");
      setShowUpdateAddressModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Erreur mise à jour adresse:", error);
      alert("Erreur: " + (error.response?.data?.message || error.message));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/connexion");
  };

  const renderAddressForm = (handleSubmit, handleClose) => (
    <>
      <div className="form-row">
        <div className="form-group">
          <label>Prénom</label>
          <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Nom</label>
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Pays</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="ma">Maroc</option>
            <option value="fr">France</option>
            <option value="us">États-Unis</option>
            <option value="dz">Algérie</option>
            <option value="tn">Tunisie</option>
          </select>
        </div>
        <div className="form-group">
          <label>Région</label>
          <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Adresse</label>
          <input type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Téléphone</label>
          <PhoneInput
            country={country}
            value={phone}
            onChange={setPhone}
            enableSearch={true}
            inputStyle={{ width: '100%', height: '45px', borderRadius: '8px', paddingLeft: '48px' }}
            buttonStyle={{ border: 'none', borderRadius: '8px 0 0 8px', backgroundColor: '#f9f9f9' }}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Code postal</label>
          <input type="text" value={codePostal} onChange={(e) => setCodePostal(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Ville</label>
          <input type="text" value={ville} onChange={(e) => setVille(e.target.value)} />
        </div>
      </div>
      <div className="modal-actions">
        <button className="cancel-btn" onClick={handleClose}>Annuler</button>
        <button className="save-btn" onClick={handleSubmit}>Enregistrer</button>
      </div>
    </>
  );

  if (loading) return <p className="loading">Chargement...</p>;

  return (
    <>
      <div className="profile-page">
        <h2>Votre compte</h2>
        <div className="profile-grid">
          <div className="profile-card">
            <h3><FaEnvelope /> INFORMATIONS PERSONNELLES</h3>
            <div className="profile-info">
              <strong>{profile.name}</strong>
              <span>{profile.email}</span>
            </div>
            <div className="btn-center">
              <button className="edit-btn" onClick={() => setShowModal(true)}><FiEdit /> Modifier</button>
            </div>
          </div>
          <div className="profile-card">
            <h3><FaHome /> ADRESSES</h3>
            <p className="adresse-label">Adresse par défaut :</p>
            {userAddress ? (
              <>
                <div className="adresse-box">
                  <p>{userAddress.first_name} {userAddress.last_name}</p>
                  <p>{userAddress.address}</p>
                  <p>{userAddress.postal_code} {userAddress.city}</p>
                  <p>{userAddress.country}</p>
                  <p>{userAddress.phone}</p>
                </div>
                <div className="btn-center">
                  <button className="edit-btn" onClick={() => {
                    setPrenom(userAddress.first_name);
                    setNom(userAddress.last_name);
                    setAdresse(userAddress.address);
                    setVille(userAddress.city);
                    setCodePostal(userAddress.postal_code);
                    setCountry(userAddress.country);
                    setRegion(userAddress.region);
                    setPhone(userAddress.phone);
                    setShowUpdateAddressModal(true);
                  }}>
                    <FiEdit /> Modifier
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="muted">Vous n'avez pas encore ajouté une adresse.</p>
                <div className="btn-center">
                  <button className="edit-btn" onClick={() => setShowAddressModal(true)}><FiEdit /> Ajouter une adresse</button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="logout-section">
          <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="profile-modal">
            <h3>Modifier le profil</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Prénom</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Nom</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="text" value={profile.email} disabled />
              <small className="email-note">L'adresse e-mail utilisée pour la connexion ne peut pas être changée</small>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="save-btn" onClick={handleSave}>Enregistrer</button>
              <button className="delete-btn">Supprimer</button>
            </div>
          </div>
        </div>
      )}

      {showAddressModal && (
        <div className="modal-backdrop">
          <div className="profile-modal">
            <h3>Ajouter une adresse</h3>
            {renderAddressForm(handleAddAddress, () => setShowAddressModal(false))}
          </div>
        </div>
      )}

      {showUpdateAddressModal && (
        <div className="modal-backdrop">
          <div className="profile-modal">
            <h3>Modifier l’adresse</h3>
            {renderAddressForm(handleUpdateAddress, () => setShowUpdateAddressModal(false))}
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePage;
