import { Routes, Route, Link } from "react-router-dom";
// Imports de páginas principales
import Home from "./pages/Home";
import Personajes from "./pages/Personajes";
import Galeria from "./pages/Galeria"; // Corregida la G mayúscula
import Frutas from "./pages/Frutas";

// Imports de páginas de detalle
import DetallePersonaje from "./pages/DetallePersonaje";
import DetalleGaleria from "./pages/DetalleGaleria"; // Coincide con tu lista de archivos
import DetalleFruta from "./pages/DetalleFruta";

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
        <Link to="/galeria" style={{ color: "#fff", textDecoration: "none" }}>
          Galería
        </Link>
        <Link to="/frutas" style={{ color: "#fff", textDecoration: "none" }}>
          Frutas
        </Link>
      </nav>

      <main style={{ padding: "2rem" }}>
        <Routes>
          {/* Rutas Principales */}
          <Route path="/" element={<Home />} />
          <Route path="/personajes" element={<Personajes />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/frutas" element={<Frutas />} />

          {/* RUTAS DINÁMICAS */}
          <Route path="/personajes/:id" element={<DetallePersonaje />} />
          <Route path="/galeria/:id" element={<DetalleGaleria />} />
          <Route path="/frutas/:id" element={<DetalleFruta />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;