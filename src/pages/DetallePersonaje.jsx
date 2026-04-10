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

      {/* Verificamos que existan las propiedades de Jikan */}
      <h1>{data.name}</h1>
      <img
        src={data.images?.jpg?.image_url}
        alt={data.name}
        style={{ width: "200px", borderRadius: "8px" }}
      />

      <div
        style={{
          background: "#f4f4f4",
          padding: "2rem",
          borderRadius: "8px",
          marginTop: "1rem",
        }}
      >
        <p>
          <strong>Nombre Japonés:</strong> {data.name_kanji || "???"}
        </p>
        <p>
          <strong>Favoritos (MAL):</strong> {data.favorites || "0"}
        </p>
        <p style={{ whiteSpace: "pre-line" }}>
          <strong>Biografía:</strong>{" "}
          {data.about || "Sin descripción disponible."}
        </p>
      </div>
    </div>
  );
};

export default DetallePersonaje;
