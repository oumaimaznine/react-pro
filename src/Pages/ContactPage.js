import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire envoyé:', formData);
    
    alert("Merci pour votre message !");
   
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      <h2>Contactez-nous</h2>
      <p>
        Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter
        en remplissant le formulaire ci-dessous.
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
      </div>
    </div>
  );
};

export default ContactPage;
