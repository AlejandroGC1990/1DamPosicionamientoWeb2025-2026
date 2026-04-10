import { useEffect, useState } from "react";
// No hace falta Link si no vamos a hacer página de detalle de una foto individual
import { getGaleria } from "../services/api";

const Galeria = () => {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        // Corregido: nombre de la función idéntico al de api.js
        const data = await getGaleria();
        setLista(data);
      } catch (error) {
        console.error("Error cargando galería:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDatos();
  }, []);

  if (loading) return <h2>Cargando Galería Oficial...</h2>;

  return (
    <div>
      <h1>Galería de Imágenes One Piece</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {lista.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "12px",
              textAlign: "center",
              background: "#fff",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h3
              style={{ marginTop: "10px", fontSize: "0.9rem", color: "#666" }}
            >
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Galeria;