import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
const HomePage = () => {
  const products = [
    {
      id: 1,
      name: "Maison de toilette pour chat",
      price: "11.00 Dhs",
      image: "/images/s.png"
    },
    {
      id: 2,
      name: "GimCat Nutri Pockets Dental 60g",
      price: "12.00 Dhs",
      image: "/images/m.png"
    },
    {
      id: 3,
      name: "Laisse extensible Flexi",
      price: "12.00 Dhs",
      image: "/images/n.png"
    },
    {
      id: 4,
      name: "Cage de transport pour chien",
      price: "39.00 Dhs",
      image: "/images/b.png"
    },
    {
      id: 5,
      name: "Spray Répulsif Specialcan",
      price: "39.00 Dhs",
      image: "/images/X.png"
    },
    {
      id: 6,
      name: "Arceau Brosse Auto-Massage",
      price: "39.00 Dhs",
      image: "/images/Ca.png"
    },
    {
      id: 7,
      name: "Manteau Hiver pour Chien",
      price: "39.00 Dhs",
      image: "/images/Cap.png"
    },
    {
      id: 8,
      name: "Lit Douillet Yagu pour Animaux",
      price: "39.00 Dhs",
      image: "/images/Captu.png"
    },
    {
      id: 9,
      name: "Jouet interactive Fetch'N Treat",
      price: "39.00 Dhs",
      image: "/images/pp.jpg"
    },
    {
      id: 10,
      name: "YAGU IGLOO AFRIQUE TERRE ",
      price: "39.00 Dhs",
      image: "/images/vv.png"
    },
  ];

  return (
    <main>
      {/* Image de couverture */}
      <section>
        <div className="hero-image">
          <img src="/images/3.png" alt="Clients heureux avec leur chien" />
        </div>
      </section>

      {/* Catégories pour Chats */}
      <section className="categories-section">
  <h2>Catégories pour Chats</h2>
  <div className="categories-grid">
    <div className="category-item">
      <Link to="/AlimentationChats">
        <img src="/images/10.jpg" alt="Alimentation chats" />
        <p>Alimentation CHATS</p>
      </Link>
    </div>
    <div className="category-item"><img src="/images/11.jpg" alt="Gamelles" /><p>Gamelles et distributeurs</p></div>
    <div className="category-item"><img src="/images/h.jpg" alt="Hygiène" /><p>Hygiène et soin</p></div>
    <div className="category-item"><img src="/images/c.jpg" alt="Habitat" /><p>Habitat et Couchage</p></div>
    <div className="category-item"><img src="/images/a.jpg" alt="Accessoires" /><p>Accessoires</p></div>
    <div className="category-item"><img src="/images/l.jpg" alt="Litière" /><p>Litières et bacs à litière</p></div>
    <div className="category-item"><img src="/images/j.jpg" alt="Jouets" /><p>Jouets</p></div>
    <div className="category-item"><img src="/images/t.jpg" alt="Transport" /><p>Transport</p></div>
  </div>
</section>


      {/* Catégories pour Chiens */}
      <section className="categories-section">
        <h2>Catégories pour Chiens</h2>
        <div className="categories-grid">
          <div className="category-item"><img src="/images/ali.jpg" alt="Alimentation" /><p>Alimentation CHIENS</p></div>
          <div className="category-item"><img src="/images/A .jpg" alt="Gamelles" /><p>Gamelles et distributeurs</p></div>
          <div className="category-item"><img src="/images/v.jpg" alt="Hygiène" /><p>Hygiène et soin</p></div>
          <div className="category-item"><img src="/images/Q.jpg" alt="Habitat" /><p>Habitat et Couchage</p></div>
          <div className="category-item"><img src="/images/R.jpg" alt="Accessoires" /><p>Accessoires</p></div>
          <div className="category-item"><img src="/images/K.jpg" alt="Toilettage" /><p>Toilettage</p></div>
          <div className="category-item"><img src="/images/G.jpg" alt="Jouets" /><p>Jouets</p></div>
          <div className="category-item"><img src="/images/p.jpg" alt="Transport" /><p>Transport</p></div>
        </div>
      </section>



      {/* Section texte d'intro sous nouvel arrivage */}
      <section className="intro-section">
        <h1>Votre animal mérite ce qu’il y a de mieux.</h1>
        <p className="intro-subtext">
      Nourriture Des fidéles  vous accompagne au quotidien avec une sélection soignée de produits de qualité pour<br />
          chiens, chats, livrés rapidement, où que vous soyez.
        </p>
      </section>

      {/* Produits */}
      <section className="product-section">
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
