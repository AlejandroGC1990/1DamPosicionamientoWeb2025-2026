import { useEffect, useState } from "react";

const Home = () => {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Declarar función asíncrona para el Fetch
    const fetchDatos = async () => {
      try {
        const res = await fetch("https://api.jikan.moe/v4/anime/21/characters");
        const json = await res.json();

        //La API devuelve los datos dentro de un objeto 'data'. 
        //Se corta a los 10 primeros.
        setPersonajes(json.data.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error("Error al consumir la API: ", error);
        setLoading(false);
      }
    };

    // Ejecutar la llamada
    fetchDatos();
  }, []); 
  // El array vacío asegura que la API solo se llame 1 vez al cargar 
  // la web

  if (loading) return <h2>Cargando Nakamas...</h2>;

  return (
    <div>
      <h1>Tripulación Destacada (Home)</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {/* Mapeo del estado para crear tarjetas dinámicas */}
        {personajes.map((item) => (
          <article
            key={item.character.mal_id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <img
              src={item.character.images.jpg.image_url}
              alt={item.character.name}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <h3 style={{ margin: "10px 0 5px" }}>{item.character.name}</h3>
            <p style={{ margin: 0, color: "#555" }}>Rol: {item.role}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Home;