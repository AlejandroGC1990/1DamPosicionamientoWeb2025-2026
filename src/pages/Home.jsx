import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPersonajes, getTripulaciones, getFrutas } from "../services/api";

// Función para obtener 'num' elementos aleatorios
const getRandomItems = (array, num) => {
  if (!array || array.length === 0) return [];
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const Home = () => {
  const [data, setData] = useState({
    personajes: [],
    tripulaciones: [],
    frutas: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Declarar función asíncrona para el Fetch
    const fetchDatos = async () => {
      try {
        // Ejecución en paralelo de las 3 peticiones
        const [personajesRes, tripulacionesRes, frutasRes] = await Promise.all([
          getPersonajes(),
          getTripulaciones(),
          getFrutas(),
        ]);

        // Actualizamos el estado con 3 elementos aleatorios de cada endpoint
        setData({
          personajes: getRandomItems(personajesRes, 3),
          tripulaciones: getRandomItems(tripulacionesRes, 3),
          frutas: getRandomItems(frutasRes, 3),
        });
      } catch (error) {
        console.error("Error en la carga inicial: ", error);
      } finally {
        setLoading(false);
      }
    };

    // Ejecutar la llamada
    fetchDatos();
  }, []);

  if (loading) return <h2>Cargando Nakamas...</h2>;

  // Estilo reutilizable para los grids
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1rem",
    marginBottom: "3rem",
  };

  const cardStyle = {
    border: "1px solid #ccc",
    padding: "1rem",
    borderRadius: "8px",
    textDecoration: "none",
    color: "inherit",
    display: "block",
  };

  return (
    <div>
      <h1>Base de Datos One Piece</h1>

      {/* SECCIÓN PERSONAJES */}
      <section>
        <h2>
          <Link to="/personajes">Explorar Personajes ➔</Link>
        </h2>
        <div style={gridStyle}>
          {data.personajes.map((item) => (
            <Link to={`/personajes/${item.id}`} key={item.id} style={cardStyle}>
              {/* Nota: Ajusta 'item.name' o 'item.image' según la clave exacta que devuelva tu API */}
              <h3 style={{ margin: "0 0 10px" }}>{item.name}</h3>
              <p style={{ margin: 0, color: "#555" }}>
                Recompensa: {item.bounty || "Desconocida"}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* SECCIÓN TRIPULACIONES */}
      <section>
        <h2>
          <Link to="/tripulaciones">Explorar Tripulaciones ➔</Link>
        </h2>
        <div style={gridStyle}>
          {data.tripulaciones.map((item) => (
            <Link
              to={`/tripulaciones/${item.id}`}
              key={item.id}
              style={cardStyle}
            >
              <h3 style={{ margin: "0 0 10px" }}>{item.name}</h3>
              <p style={{ margin: 0, color: "#555" }}>Estado: {item.status}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* SECCIÓN FRUTAS */}
      <section>
        <h2>
          <Link to="/frutas">Explorar Akuma no Mi ➔</Link>
        </h2>
        <div style={gridStyle}>
          {data.frutas.map((item) => (
            <Link to={`/frutas/${item.id}`} key={item.id} style={cardStyle}>
              <h3 style={{ margin: "0 0 10px" }}>{item.name}</h3>
              <p style={{ margin: 0, color: "#555" }}>Tipo: {item.type}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;