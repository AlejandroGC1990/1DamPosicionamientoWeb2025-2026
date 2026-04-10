import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTripulacionById } from "../services/api";

const DetalleTripulacion = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const res = await getTripulacionById(id);
        setData(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDatos();
  }, [id]);

  if (loading) return <h2>Cargando registro del barco...</h2>;
  if (!data) return <h2>Error al cargar la tripulación.</h2>;

  return (
    <div>
      <Link
        to="/tripulaciones"
        style={{ color: "blue", textDecoration: "none" }}
      >
        ⬅ Volver a Tripulaciones
      </Link>
      <h1>{data.name}</h1>
      <div
        style={{ background: "#f4f4f4", padding: "2rem", borderRadius: "8px" }}
      >
        <p>
          <strong>Nombre en Romanji:</strong> {data.roman_name || "???"}
        </p>
        <p>
          <strong>Recompensa Total:</strong> {data.total_prime || "Desconocida"}
        </p>
        <p>
          <strong>Estado:</strong> {data.status || "???"}
        </p>
      </div>
    </div>
  );
};

export default DetalleTripulacion;
