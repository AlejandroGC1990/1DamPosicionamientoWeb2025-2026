import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPersonajes, getFrutas } from "../services/api";

const getRandomItem = (array) => {
  if (!array || array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
};

const Home = () => {
  const [data, setData] = useState({
    personaje: null,
    momento: null,
    fruta: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        // Peticiones
        const [personajesRes, frutasRes] = await Promise.all([
          getPersonajes(),
          getFrutas(),
        ]);

        // Para los "Momentos", pedimos las fotos oficiales del anime a Jikan
        const resFotos = await fetch(
          "https://api.jikan.moe/v4/anime/21/pictures",
        );
        const jsonFotos = await resFotos.json();

        setData({
          personaje: getRandomItem(personajesRes),
          momento: getRandomItem(jsonFotos.data),
          fruta: getRandomItem(frutasRes.filter((f) => f.filename)),
        });
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDatos();
  }, []);

  if (loading) return <h2>Cargando Grand Line...</h2>;

  const cardStyle = {
    border: "1px solid #ccc",
    padding: "1.5rem",
    borderRadius: "12px",
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  };

  const imgStyle = {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "1rem",
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>One Piece Explorer</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {/* CARD PERSONAJES */}
        <Link to="/personajes" style={cardStyle}>
          <h2>Personajes</h2>
          <img src={data.personaje?.image} alt="Personaje" style={imgStyle} />
          <p>Ver todos los piratas</p>
        </Link>

        {/* CARD MOMENTOS (Sustituye a galeria) */}
        <Link to="/momentos" style={cardStyle}>
          <h2>Galería</h2>
          <img
            src={data.momento?.jpg.large_image_url}
            alt="Momento Anime"
            style={imgStyle}
          />
          <p>Imágenes oficiales del anime</p>
        </Link>

        {/* CARD FRUTAS */}
        <Link to="/frutas" style={cardStyle}>
          <h2>Frutas del Diablo</h2>
          <img src={data.fruta?.filename} alt="Fruta" style={imgStyle} />
          <p>Enciclopedia Akuma no Mi</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
