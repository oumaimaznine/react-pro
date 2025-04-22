import React, { useState } from 'react';
import axios from 'axios';
import './Updateprofil.css'; 

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const token = localStorage.getItem('token');

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('http://localhost:8000/api/user',
        {
          first_name: firstName,
          last_name: lastName,
          password: password
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Profil mis à jour !');
      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data);
      alert(' Erreur lors de la mise à jour');
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Modifier mon profil</h2>
      <form className="profile-form" onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
