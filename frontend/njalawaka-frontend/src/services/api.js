const API_URL = "http://127.0.0.1:5000";

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

export const getEquipment = async () => {
  const response = await fetch(`${API_URL}/equipment`);
  return response.json();
};