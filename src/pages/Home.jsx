import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPersonajes, getTripulaciones, getFrutas } from "../services/api";

// Extrae exactamente 1 elemento aleatorio de un array
const getRandomItem = (array) => {
  if (!array || array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
};

const Home = () => {
  const [data, setData] = useState({
    personaje: null,
    tripulacion: null,
    fruta: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [personajesRes, tripulacionesRes, frutasRes] = await Promise.all([
          getPersonajes(),
          getTripulaciones(),
          getFrutas(),
        ]);

        setData({
          personaje: getRandomItem(personajesRes),
          tripulacion: getRandomItem(tripulacionesRes),
          fruta: getRandomItem(frutasRes),
        });
      } catch (error) {
        console.error("Error en la carga inicial: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();
  }, []);

  if (loading) return <h2>Cargando Base de Datos...</h2>;

  // Estilos
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
  };

  const cardStyle = {
    border: "1px solid #ccc",
    padding: "1.5rem",
    borderRadius: "8px",
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  };

  const imgStyle = {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "8px",
    margin: "1rem 0",
  };

  return (
    <div>
      <h1>Base de Datos One Piece</h1>

      <div style={gridStyle}>
        {/* CARD SECCIÓN PERSONAJES */}
        {data.personaje && (
          <Link to="/personajes" style={cardStyle}>
            <h2>Personajes</h2>
            {/* Nota: Sustituye 'filename' por la propiedad real de la imagen de tu API */}
            <img
              src={data.personaje.filename || "https://via.placeholder.com/250"}
              alt="Personaje Aleatorio"
              style={imgStyle}
            />
            <p>Ver lista completa de personajes</p>
            <small>
              Destacado: {data.personaje.name || data.personaje.roman_name}
            </small>
          </Link>
        )}

        {/* CARD SECCIÓN TRIPULACIONES */}
        {data.tripulacion && (
          <Link to="/tripulaciones" style={cardStyle}>
            <h2>Tripulaciones</h2>
            <img
              src={
                data.tripulacion.filename || "https://via.placeholder.com/250"
              }
              alt="Tripulación Aleatoria"
              style={imgStyle}
            />
            <p>Ver todas las tripulaciones</p>
            <small>
              Destacada: {data.tripulacion.name || data.tripulacion.roman_name}
            </small>
          </Link>
        )}

        {/* CARD SECCIÓN FRUTAS */}
        {data.fruta && (
          <Link to="/frutas" style={cardStyle}>
            <h2>Akuma no Mi</h2>
            <img
              src={data.fruta.filename || "https://via.placeholder.com/250"}
              alt="Fruta Aleatoria"
              style={imgStyle}
            />
            <p>Explorar Frutas del Diablo</p>
            <small>Destacada: {data.fruta.name || data.fruta.roman_name}</small>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
