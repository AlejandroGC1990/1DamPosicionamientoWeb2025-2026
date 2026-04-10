const BASE_URL = "https://api.api-onepiece.com/v2";

// --- FETCH LISTAS COMPLETAS ---
export const getPersonajes = async () => {
  const res = await fetch(`${BASE_URL}/characters/en`);
  return await res.json();
};

export const getTripulaciones = async () => {
  const res = await fetch(`${BASE_URL}/crews/en`);
  return await res.json();
};

export const getFrutas = async () => {
  const res = await fetch(`${BASE_URL}/fruits/en`);
  return await res.json();
};

// --- FETCH DETALLES POR ID ---
export const getPersonajeById = async (id) => {
  const res = await fetch(`${BASE_URL}/characters/en/${id}`);
  return await res.json();
};

export const getTripulacionById = async (id) => {
  const res = await fetch(`${BASE_URL}/crews/en/${id}`);
  return await res.json();
};

export const getFrutaById = async (id) => {
  const res = await fetch(`${BASE_URL}/fruits/en/${id}`);
  return await res.json();
};
