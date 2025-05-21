// src/Pages/EmailVerified.jsx

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function EmailVerified() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("token", token);

      axios.get(`${process.env.REACT_APP_API_URL}/api/user`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/profil");
      })
      .catch(() => {
        navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  return <p>🔄 Vérification terminée... Redirection en cours...</p>;
}

export default EmailVerified;
