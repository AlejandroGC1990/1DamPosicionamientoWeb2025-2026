import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// CAMBIA getTripulacionById POR getImagenById
import { getImagenById } from "../services/api";

const DetalleGaleria = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        // Usa la función correcta
        const res = await getImagenById(id);
        setData(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDatos();
  }, [id]);

  if (loading) return <h2>Cargando imagen de la galería...</h2>;
  if (!data) return <h2>Imagen no encontrada.</h2>;

  return (
    <div>
      <Link to="/galeria" style={{ color: "blue", textDecoration: "none" }}>
        ⬅ Volver a Galería
      </Link>
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <img
          src={data.jpg.large_image_url}
          alt="Detalle"
          style={{
            maxWidth: "100%",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          }}
        />
        <p style={{ marginTop: "1rem", color: "#666" }}>
          Arte oficial del anime
        </p>
      </div>
    </div>
  );
};

export default DetalleGaleria;
