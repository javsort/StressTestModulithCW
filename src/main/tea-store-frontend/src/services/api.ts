import axios from 'axios';

const BASE_URL = 'http://localhost:8081';

// First endpoint called -> retrieves the session Id for later requests
export const fetchProducts = async () => {
  console.log('Fetching products...');

  try {
    // Retrieve session ID explicitly
    const sessionResponse = await fetch(`${BASE_URL}/session`, {
      credentials: 'include',
    });

    if (!sessionResponse.ok) throw new Error('Failed to fetch session ID');

    const sessionId = await sessionResponse.text();

    // Make sure session ID is available
    if (sessionId) {
      // Store session ID in local storage to perform all operations
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

// Add to cart endpoint -> Called by productSpotlight page
export const addToCart = async (sessionId: string, productId: string, quantity: number) => {
  console.log('Adding to cart with: ', sessionId, productId, quantity);

  try {
    // Add to cart 'productId': quantity
    const response = await axios.post(`${BASE_URL}/cart/${sessionId}`, {
      content: {
        [productId]: quantity,
      },
    });

    // List of successfully added items
    return response.data;

  } catch (error) {

    console.error('Error adding to cart:', error);
    throw error;

  }
};

// Second endpoint called -> retrieves the cart items -> Called by overlay and cart page
export const getCart = async (sessionId: string) => {
  console.log('Fetching cart with session ID: ', sessionId);

  try {
    const response = await axios.get(`${BASE_URL}/cart/${sessionId}`);
    return response.data;

  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;

  }
}

// Update cart endpoint -> Called by cart page and overlay
// Update cart == Delete from cart, since delete is actually just the amt of items in negative
export const updateCart = async (sessionId: string, productId: string, quantity: number) => {
  console.log('Updating cart with: ', sessionId, productId, quantity);

  try {
    const response = await axios.post(`${BASE_URL}/cart/${sessionId}`, {
      content: {
        [productId]: quantity,
      },
    });

    // List of successfully added items
    return response.data;

  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  
  }
};

// Confirm order endpoint -> Called by checkout page
export const confirmOrder = async (orderData: object) => {
  console.log('Confirming order with: ', orderData);

  try {
    const response = await axios.post(`${BASE_URL}/confirm`, orderData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to confirm order');
    }

    // Return the confirmation response
    return response.data;
  } catch (error) {
    console.error('Error confirming order:', error);
    throw error;

  }
};
