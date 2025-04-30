import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/connexion');
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data);
      } catch (error) {
        console.error("Erreur:", error);
        alert("Erreur de connexion. Veuillez vous reconnecter.");
        localStorage.clear();
        navigate('/connexion');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Déconnecté !");
    navigate("/connexion");
  };

  if (loading) return <p style={{ textAlign: "center" }}>Chargement...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src="https://ui-avatars.com/api/?name=User"
          alt="avatar"
          className="profile-avatar"
        />
        <h2>Profil Utilisateur</h2>
        <p><strong>Nom:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>

        <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
      </div>
    </div>
  );
}

export default ProfilePage;
