import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
// import Personajes from "./pages/Personajes";
// import DetallePersonaje from "./pages/DetallePersonaje";
// import Tripulaciones from "./pages/Tripulaciones";
// import DetalleTripulacion from "./pages/DetalleTripulacion";
// import Frutas from "./pages/Frutas";
// import DetalleFruta from "./pages/DetalleFruta";

function App() {
  return (
    <div>
      <nav
        style={{
          padding: "1rem",
          background: "#222",
          color: "white",
          display: "flex",
          gap: "1rem",
        }}
      >
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          Home
        </Link>
        <Link
          to="/personajes"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Personajes
        </Link>
        <Link
          to="/tripulaciones"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Tripulaciones
        </Link>
        <Link to="/frutas" style={{ color: "#fff", textDecoration: "none" }}>
          Frutas
        </Link>
      </nav>

      <main style={{ padding: "2rem" }}>
        <Routes>
          {/* Rutas Principales */}
          <Route path="/" element={<Home />} />
          {/* <Route path="/personajes" element={<Personajes />} />
          <Route path="/tripulaciones" element={<Tripulaciones />} />
          <Route path="/frutas" element={<Frutas />} /> */}

          {/* RUTAS DINÁMICAS (El :id captura el número o texto de la URL) */}
          {/* <Route path="/personajes/:id" element={<DetallePersonaje />} />
          <Route path="/tripulaciones/:id" element={<DetalleTripulacion />} />
          <Route path="/frutas/:id" element={<DetalleFruta />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;