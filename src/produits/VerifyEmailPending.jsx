import React from "react";

function VerifyEmailPending() {
  return (
    <div className="mots">
      <div className="motss">
        <h2 className="text-2">Vérifiez votre email</h2>
        <p className="text-p">
          Un lien de confirmation a été envoyé à votre adresse e-mail.
          <br />
          Veuillez cliquer dessus pour activer votre compte.
        </p>
      </div>

      {/*  CSS directement */}
      <style>{`
        .mots {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .motss {
          background-color: white;
          padding: 40px;
          border-radius: 12px;
          text-align: center;
          max-width: 600px;
        }

        .text-2 {
          font-size: 28px;
          font-weight: bold;
          color:#A3B18A;
          margin-bottom: 20px;
        }

        .text-p {
          font-size: 18px;
          color: #444;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}

export default VerifyEmailPending;
