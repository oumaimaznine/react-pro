import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { FaHome, FaEnvelope } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Loader from "../components/Loader";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showUpdateAddressModal, setShowUpdateAddressModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showUpdateSuccessAlert, setShowUpdateSuccessAlert] = useState(false);
  const [showAddSuccessAlert, setShowAddSuccessAlert] = useState(false);
  const [errors, setErrors] = useState({});
  const [profileErrors, setProfileErrors] = useState({});


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


        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        console.log("Données du profil:", response.data);

        setProfile(response.data);
        const [prenom, nom] = response.data.name.split(' ');
        setFirstName(prenom || '');
        setLastName(nom || '');
      } catch (error) {
        console.error(" Erreur récupération profil:", error);
        console.error("Erreur:", error);
      
     
      }
    };

    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/address`, {
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
    const errors = {};
  
    if (!firstName.trim() || firstName.length < 2 || firstName.length > 30) {
      errors.firstName = "Le prénom doit contenir entre 2 et 30 caractères.";
    }
  
    if (!lastName.trim() || lastName.length < 2 || lastName.length > 30) {
      errors.lastName = "Le nom doit contenir entre 2 et 30 caractères.";
    }
  
    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const updatedName = `${firstName} ${lastName}`;
  
      await axios.put(`${process.env.REACT_APP_API_URL}/api/user`, {
        name: updatedName,
        email: profile.email,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      setProfile((prev) => ({ ...prev, name: updatedName }));
      setShowModal(false);
      setProfileErrors({});
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };
  
  const handleAddAddress = async () => {
    const newErrors = {};
  
    if (!prenom.trim() || prenom.length < 2 || prenom.length > 30) {
      newErrors.prenom = "Le prénom doit contenir entre 2 et 30 caractères.";
    }
  
    if (!nom.trim() || nom.length < 2 || nom.length > 30) {
      newErrors.nom = "Le nom doit contenir entre 2 et 30 caractères.";
    }
  
    if (!ville.trim() || ville.length < 2 || ville.length > 30) {
      newErrors.ville = "Le nom de la ville doit contenir 2 à 30 caractères.";
    }
  
    
    if (!adresse.trim() || adresse.length < 9) {
      newErrors.adresse = "L'adresse doit contenir au moins 9 caractères.";
    }
  
    if (!region.trim() || region.length < 5) {
      newErrors.region = "La région doit contenir au moins 5 caractères.";
    }
  
    if (!codePostal.trim() || !/^\d{5}$/.test(codePostal)) {
      newErrors.codePostal = "Le code postal doit être composé de 5 chiffres.";
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
  
      await axios.post(`${process.env.REACT_APP_API_URL}/api/address`, {
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
  
      setShowAddSuccessAlert(true);
      setErrors({});
    } catch (error) {
      console.error("Erreur axios complète:", error);
    }
  };
  
  const handleUpdateAddress = async () => {
    const newErrors = {};
  
    if (!prenom.trim() || prenom.length < 2 || prenom.length > 40) {
      newErrors.prenom = "Le prénom doit contenir entre 2 et 40 caractères.";
    }
  
    if (!nom.trim() || nom.length < 2 || nom.length > 40) {
      newErrors.nom = "Le nom doit contenir entre 2 et 40 caractères.";
    }
  
    if (!ville.trim() || ville.length < 2 || ville.length > 60) {
      newErrors.ville = "Le nom de la ville doit contenir 2 à 60 caractères.";
    }
    if (!adresse.trim() || adresse.length < 5) {
      newErrors.adresse = "L'adresse doit contenir au moins 5 caractères.";
    }
  
    if (!region.trim() || region.length < 2) {
      newErrors.region = "La région doit contenir au moins 2 caractères.";
    }
  
    if (!codePostal.trim() || !/^\d{5}$/.test(codePostal)) {
      newErrors.codePostal = "Le code postal doit être composé de 5 chiffres.";
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.REACT_APP_API_URL}/api/address`, {
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
  
      setShowUpdateSuccessAlert(true);
      setErrors({}); 
    } catch (error) {
      console.error("Erreur mise à jour adresse:", error);
      alert("Erreur: " + (error.response?.data?.message || error.message));
    }
  };
  


const handleDeleteAddress = () => {
  setShowDeleteConfirmModal(true); 
};

const handleDeleteAddressConfirmed = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/address`, {
      headers: { Authorization: `Bearer ${token}` },
    });

   
    setUserAddress(null);
    setShowUpdateAddressModal(false);
    setShowDeleteConfirmModal(false); 
  } catch (error) {
    console.error("Erreur suppression adresse:", error);
    alert("Erreur: " + (error.response?.data?.message || error.message));
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/connexion");
  };

  const renderAddressForm = (handleSubmit, handleClose, showDelete = false) => (
    <>
      
        <div className="form-row">
  <div className="form-group">
    <label>Prénom</label>
    <input
      type="text"
      value={prenom}
      onChange={(e) => setPrenom(e.target.value)}
      className={errors.prenom ? "error-input" : ""}
    />
    {errors.prenom && <small className="error-message">{errors.prenom}</small>}
  </div>
  <div className="form-group">
    <label>Nom</label>
    <input
      type="text"
      value={nom}
      onChange={(e) => setNom(e.target.value)}
      className={errors.nom ? "error-input" : ""}
    />
    {errors.nom && <small className="error-message">{errors.nom}</small>}
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
  <input
    type="text"
    value={region}
    onChange={(e) => setRegion(e.target.value)}
    className={errors.region ? "error-input" : ""}
  />
  {errors.region && <small className="error-message">{errors.region}</small>}
</div>

</div>

<div className="form-row">
  <div className="form-group">
  <label>Adresse</label>
    <input
      type="text"
      value={adresse}
      onChange={(e) => setAdresse(e.target.value)}
      className={errors.adresse ? "error-input" : ""}
    />
    {errors.adresse && <small className="error-message">{errors.adresse}</small>}
  </div>
  <div className="form-group">
    <label>Téléphone</label>
    <PhoneInput
      country={country}
      value={phone}
      onChange={setPhone}
      enableSearch={true}
      inputStyle={{
        width: '100%',
        height: '45px',
        borderRadius: '8px',
        paddingLeft: '48px',
        border: errors.phone ? '1px solid red' : undefined,
        backgroundColor: errors.phone ? '#fff0f0' : undefined,
      }}
      buttonStyle={{
        border: 'none',
        borderRadius: '8px 0 0 8px',
        backgroundColor: '#f9f9f9',
      }}
    />
    {errors.phone && <small className="error-message">{errors.phone}</small>}
  </div>
</div>

<div className="form-row">
  <div className="form-group">
  <label>Code postal</label>
    <input
      type="text"
      value={codePostal}
      onChange={(e) => setCodePostal(e.target.value)}
      className={errors.codePostal ? "error-input" : ""}
    />
    {errors.codePostal && <small className="error-message">{errors.codePostal}</small>}
  </div>
  <div className="form-group">
    <label>Ville</label>
    <input
      type="text"
      value={ville}
      onChange={(e) => setVille(e.target.value)}
      className={errors.ville ? "error-input" : ""}
    />
    {errors.ville && <small className="error-message">{errors.ville}</small>}
  </div>
</div>

<div className="modal-actions spaced-between">
  <div>
    <button className="delete-btn" onClick={handleDeleteAddress}>Supprimer</button>
  </div>
  <div>
    <button className="cancel-btn" onClick={handleClose}>Annuler</button>
    <button className="save-btn" onClick={handleSubmit}>Enregistrer</button>
  </div>
</div>


    </>
  );

  return (
    <div className="page-full-height">
     {loading || !profile ? (
  <Loader />
) : (


        <div className="profile-page">
          <h2>Votre compte</h2>
          <div className="profile-grid">
            <div className="profile-card">
              <h3><FaEnvelope /> INFORMATIONS PERSONNELLES</h3>
              <div className="profile-info">
              {profile && (
  <>
    <strong>{profile.name}</strong>
    <span>{profile.email}</span>
  </>
)}

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

          {showModal && (
            <div className="modal-backdrop">
              <div className="profile-modal">
                <h3>Modifier le profil</h3>
                <div className="form-row">
  <div className="form-group">
    <label>Prénom</label>
    <input
      type="text"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      className={profileErrors.firstName ? "error-input" : ""}
    />
    {profileErrors.firstName && <small className="error-message">{profileErrors.firstName}</small>}
  </div>
  <div className="form-group">
    <label>Nom</label>
    <input
      type="text"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      className={profileErrors.lastName ? "error-input" : ""}
    />
    {profileErrors.lastName && <small className="error-message">{profileErrors.lastName}</small>}
  </div>
</div>

<div className="form-group">
  <label>Email</label>
  <input type="text" value={profile.email} disabled />
  <small className="email-note">L'adresse e-mail utilisée pour la connexion ne peut pas être changée</small>
</div>

                <div className="modal-actions horizontal">
  <button className="cancel-btn" onClick={() => setShowModal(false)}>Annuler</button>
  <button className="save-btn" onClick={handleSave}>Enregistrer</button>
</div>

              </div>
            </div>
          )}
{showAddSuccessAlert && (
  <div className="alert-overlay">
    <div className="alert-box">
      <p>Adresse ajoutée avec succès !</p>
      <button
        onClick={() => {
          setShowAddSuccessAlert(false);
          setShowAddressModal(false);
          window.location.reload();
        }}
      >
        OK
      </button>
    </div>
  </div>
)}

          {showAddressModal && (
            <div className="modal-backdrop">
              <div className="profile-modal">
              <div className="modal-scroll-container">
                <h3>Ajouter une adresse</h3>
                {renderAddressForm(handleAddAddress, () => setShowAddressModal(false))}
              </div>
            </div>
            </div>

          )}
    {showUpdateSuccessAlert && (
  <div className="alert-overlay">
    <div className="alert-box">
      <p>Adresse mise à jour avec succès !</p>
      <button
        onClick={() => {
          setShowUpdateSuccessAlert(false);
          setShowUpdateAddressModal(false);
          window.location.reload();
        }}
      >
        OK
      </button>
    </div>
  </div>
)}

{showDeleteConfirmModal && (
  <div className="modal-backdropp">
    <div className="delete-confirm-modall">
      <button className="close-btnn" onClick={() => setShowDeleteConfirmModal(false)}>×</button>
      <h3>Supprimer l’adresse ?</h3>
      <p className="subtext">Voulez-vous vraiment supprimer cette adresse ?</p>
      <div className="modal-actions horizontall">
        <button className="cancel-linkk" onClick={() => setShowDeleteConfirmModal(false)}>Retour</button>
        <button className="delete-btnn" onClick={handleDeleteAddressConfirmed}>Supprimer l’adresse</button>
      </div>
    </div>
  </div>
)}


          {showUpdateAddressModal && (
            <div className="modal-backdrop">
              <div className="profile-modal">
              <div className="modal-scroll-container">
                <h3>Modifier l’adresse</h3>
                {renderAddressForm(handleUpdateAddress, () => setShowUpdateAddressModal(false), true)}
              </div>
            </div>
              </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
