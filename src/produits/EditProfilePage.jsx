import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EditProfilePage.css'; 
import { useNavigate } from 'react-router-dom';

function EditProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        alert("Erreur de chargement du profil");
        navigate('/connexion');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://127.0.0.1:8000/api/user', {
        name,
        email,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Profil mis à jour avec succès !");
      navigate('/ProfilePage');
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la mise à jour");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Modifier le Profil</h2>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="green-btn">Mettre à jour</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;
