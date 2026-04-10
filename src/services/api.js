// src/services/api.js
const JIKAN_API_URL = "https://api.jikan.moe/v4";
const OP_API_URL = "https://api.api-onepiece.com/v2";

// --- LISTADOS ---

export const getPersonajes = async () => {
  const res = await fetch(`${JIKAN_API_URL}/anime/21/characters`);
  const json = await res.json();
  return json.data.map((item) => ({
    id: item.character.mal_id,
    name: item.character.name,
    image: item.character.images.jpg.image_url,
  }));
};

export const getGaleria = async () => {
  const res = await fetch(`${JIKAN_API_URL}/anime/21/pictures`);
  const json = await res.json();
  return json.data.map((item, index) => ({
    id: index,
    image: item.jpg.large_image_url,
    name: `Imagen Oficial ${index + 1}`,
  }));
};

export const getFrutas = async () => {
  const res = await fetch(`${OP_API_URL}/fruits/en`);
  return await res.json();
};

// --- DETALLES (Lo que faltaba) ---

// Para personajes usamos Jikan (ID de MyAnimeList)
export const getPersonajeById = async (id) => {
  const res = await fetch(`${JIKAN_API_URL}/characters/${id}`);
  const json = await res.json();
  return json.data; // Jikan devuelve el objeto directamente en 'data'
};

// Para frutas usamos la API de One Piece
export const getFrutaById = async (id) => {
  const res = await fetch(`${OP_API_URL}/fruits/en/${id}`);
  return await res.json();
};

// Para la galería, como son fotos de Jikan, el "detalle" es la misma imagen
export const getImagenById = async (id) => {
  const res = await fetch(`${JIKAN_API_URL}/anime/21/pictures`);
  const json = await res.json();
  return json.data[id]; // Usamos el índice como ID
};
