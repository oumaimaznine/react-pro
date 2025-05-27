import React, { useState } from 'react';
import axios from 'axios';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token'); 
  
      const response = await axios.post(
        'http://localhost:8000/api/contact',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      setSuccessMessage(response.data.message); 
      setErrorMessage('');
      setFormData({ name: '', email: '', message: '' }); 
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage("Erreur lors de l’envoi du message.");
      console.error(error);
    }
  };
  

  return (
    <div className="contact-page">
      <h2>Contactez-nous</h2>
      <p>
        Si vous avez des questions, remplissez le formulaire ci-dessous.
      </p>

      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom :</label>
            <input
              type="text"
              name="name"
              placeholder="Votre nom"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email :</label>
            <input
              type="email"
              name="email"
              placeholder="Votre email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Message :</label>
            <textarea
              name="message"
              placeholder="Votre message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Envoyer</button>
        </form>

        {successMessage && <p className="success-msg">{successMessage}</p>}
        {errorMessage && <p className="error-msg">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ContactPage;
