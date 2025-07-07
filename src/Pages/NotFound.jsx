import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '100px 20px',
        backgroundColor: '#f3f3f3',
        height: '100vh',
      }}
    >
      <h1 style={{ fontSize: '80px', margin: '0' }}>404</h1>
      <h2
        style={{
          fontWeight: 'bold',
          marginBottom: '10px',
          fontSize: '32px',
          color: '#333',
        }}
      >
        <span
          style={{
            backgroundColor: '#fcdcdc',
            padding: '5px 10px',
            borderRadius: '5px',
          }}
        >
          Oups !
        </span>
      </h2>
      <p style={{ color: '#555' }}>
        Désolé ! La page que vous cherchez n'existe pas.
      </p>

      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#000',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '16px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Retour au magasin
      </button>
    </div>
  );
};

export default NotFound;
