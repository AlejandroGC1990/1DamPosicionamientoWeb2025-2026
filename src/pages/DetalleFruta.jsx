import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getFrutaById } from "../services/api";

const DetalleFruta = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const res = await getFrutaById(id);
        setData(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDatos();
  }, [id]);

  if (loading) return <h2>Analizando Akuma no Mi...</h2>;
  if (!data) return <h2>Error al cargar la fruta.</h2>;

  return (
    <div>
      <Link to="/frutas" style={{ color: "blue", textDecoration: "none" }}>
        ⬅ Volver a Frutas
      </Link>
      <h1>{data.name}</h1>
      <div
        style={{ background: "#f4f4f4", padding: "2rem", borderRadius: "8px" }}
      >
        <p>
          <strong>Nombre en Romanji:</strong> {data.roman_name || "???"}
        </p>
        <p>
          <strong>Tipo:</strong> {data.type || "Desconocido"}
        </p>
        <p>
          <strong>Descripción:</strong>{" "}
          {data.description || "Sin descripción en la base de datos."}
        </p>
      </div>
    </div>
  );
};

export default DetalleFruta;
