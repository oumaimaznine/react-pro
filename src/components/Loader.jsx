// src/components/Loader.jsx
import React from 'react';
import { BeatLoader } from 'react-spinners';

const Loader = ({ loading = true, size = 15, color = "#333" }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100px'
    }}>
      <BeatLoader loading={loading} size={size} color={color} />
    </div>
  );
};

export default Loader;
