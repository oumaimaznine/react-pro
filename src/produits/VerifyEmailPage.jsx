import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyEmail() {
  const { id, hash } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Vérification en cours...");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/verify-email/${id}/${hash}`
        );
        setMessage(response.data.message);
        setStatus("success");

        setTimeout(() => {
          navigate("/");
        }, 9000);
      } catch (error) {
        setMessage("Erreur lors de la vérification.");
        setStatus("error");
      }
    };

    verifyEmail();
  }, [id, hash, navigate]);

  return (
    <div className="phrase">
      <div className="text-center">
        <h2 className="text">
          {status === "success" ? "Email vérifié" : "Vérification"}
        </h2>
        <p>{message}</p>
      </div>

      {/* Style CSS */}
      <style>{`
        .phrase {
       display: flex;
          align-items: center;
          justify-content: center;
        }

        .text-center {
          background: white;
          padding: 30px;
          text-align: center;
        }

        .text {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
          color:#A3B18A; 
        }

        p {
          font-size: 18px;
          color: #555;
        }
      `}</style>
    </div>
  );
}

export default VerifyEmail;
