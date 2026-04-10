import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Personajes from "./pages/Personajes";

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
          to="/Personajes"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Personajes
        </Link>
      </nav>

      <main style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personajes" element={<Personajes />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;