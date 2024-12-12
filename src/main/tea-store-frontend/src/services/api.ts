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

export const getCart = async (sessionId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/cart/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
}

export const updateCart = async (sessionId: string, productId: string, quantity: number) => {
  console.log('Updating cart with: ', sessionId, productId, quantity);
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

export const deleteFromCart = async (sessionId: string, productId: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/cart/${sessionId}`, {
      content: {
        [productId]: 0,
      },
    });
    return response.data; // List of successfully added items
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const confirmOrder = async (orderData: object) => {
  try {
    const response = await axios.post(`${BASE_URL}/confirm`, orderData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to confirm order');
    }

    return response.data; // Return the confirmation response
  } catch (error) {
    console.error('Error confirming order:', error);
    throw error;
  }
};
