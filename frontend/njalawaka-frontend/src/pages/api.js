const API_BASE = "http://127.0.0.1:5000";

export const getProducts = async () => {
  const response = await fetch(`${API_BASE}/products`);
  return response.json();
};

export const getEquipment = async () => {
  const response = await fetch(`${API_BASE}/equipment`);
  return response.json();
};