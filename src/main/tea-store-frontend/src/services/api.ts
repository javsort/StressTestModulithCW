const BASE_URL = 'http://localhost:8081';

export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const fetchCart = async (sessionId: string) => {
  const response = await fetch(`${BASE_URL}/cart/${sessionId}`);
  if (!response.ok) throw new Error('Failed to fetch cart');
  return response.json();
};

export const updateCart = async (sessionId: string, payload: object) => {
  const response = await fetch(`${BASE_URL}/cart/${sessionId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Failed to update cart');
  return response.json();
};

export const confirmOrder = async (orderData: object) => {
  const response = await fetch(`${BASE_URL}/confirm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) throw new Error('Failed to confirm order');
  return response.json();
};
