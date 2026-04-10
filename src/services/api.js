const BASE_URL = "https://api.api-onepiece.com/v2";

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
