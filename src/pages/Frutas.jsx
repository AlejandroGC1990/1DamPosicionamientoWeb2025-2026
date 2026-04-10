import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFrutas } from "../services/api";

const Frutas = () => {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const data = await getFrutas();
        setLista(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDatos();
  }, []);

  if (loading) return <h2>Cargando Frutas del Diablo...</h2>;

  return (
    <div>
      <h1>Listado de Akuma no Mi</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {lista.map((item) => (
          <Link
            to={`/frutas/${item.id}`}
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <h3>{item.name}</h3>
            <p>Tipo: {item.type}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Frutas;
