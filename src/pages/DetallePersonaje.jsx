import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPersonajeById } from "../services/api";

const DetallePersonaje = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const res = await getPersonajeById(id);
        setData(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDatos();
  }, [id]);

  if (loading) return <h2>Buscando en la base de datos de la Marina...</h2>;
  if (!data) return <h2>Error al cargar el personaje.</h2>;

  return (
    <div>
      <Link to="/personajes" style={{ color: "blue", textDecoration: "none" }}>
        ⬅ Volver a Personajes
      </Link>
      <h1>{data.name}</h1>
      <div
        style={{ background: "#f4f4f4", padding: "2rem", borderRadius: "8px" }}
      >
        <p>
          <strong>Recompensa:</strong> {data.bounty || "Desconocida"}
        </p>
        <p>
          <strong>Puesto:</strong> {data.job || "No especificado"}
        </p>
        <p>
          <strong>Tamaño:</strong> {data.size || "???"}
        </p>
        <p>
          <strong>Estado:</strong> {data.status || "???"}
        </p>
      </div>
    </div>
  );
};

export default DetallePersonaje;
