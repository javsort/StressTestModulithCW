import axios from 'axios';

const BASE_URL = 'http://localhost:8081';

const apiClient = axios.create({
  baseURL: 'http://localhost:8081',
});

// First endpoint called -> retrieves the session Id for later requests
export const fetchProducts = async () => {
  try {
    // Retrieve session ID explicitly
    const sessionResponse = await fetch(`${BASE_URL}/session`, {
      credentials: 'include',
    });

    if (!sessionResponse.ok) throw new Error('Failed to fetch session ID');

    const sessionId = await sessionResponse.text();
    if (sessionId) {
      localStorage.setItem('sessionId', sessionId);
      console.log('Session ID fetched: ', sessionId);
    } else {
      throw new Error('Session ID is missing');
    }

    // Fetch products after ensuring session ID
    const productResponse = await fetch(`${BASE_URL}/products`, {
      credentials: 'include',
    });

    if (!productResponse.ok) throw new Error('Failed to fetch products');

    console.log('Products fetched successfully for session ID: ', sessionId);
    return productResponse.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const addToCart = async (sessionId: string, productId: string, quantity: number) => {
  try {
    const response = await axios.post(`${BASE_URL}/cart/${sessionId}`, {
      content: {
        [productId]: quantity,
      },
    });
    return response.data; // List of successfully added items
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};


export const fetchSingleProduct = async (id: string) => {
  const response = await fetch(`${BASE_URL}/inventory/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product with id: ' + id);

  return response.json();
};

export const fetchCart = async (sessionId: string) => {
  const response = await fetch(`${BASE_URL}/cart/${sessionId}`, {
    method: 'GET',
    credentials: 'include',
  });
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
