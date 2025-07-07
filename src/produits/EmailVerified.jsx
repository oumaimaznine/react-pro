import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

function EmailVerified() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("token", token);

      axios.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/profil"); 
        })
        .catch((err) => {
          console.error("Échec récupération user:", err);
          navigate("/connexion");
        });
    } else {
      navigate("/connexion");
    }
  }, [location, navigate]);

  return <Loader size={20} color="#333" />;
}

export default EmailVerified;
