import axios from 'axios';

const API_URL = 'http://localhost:8080/api/orders';

// ✅ Get token
const getToken = () => JSON.parse(localStorage.getItem('user'))?.token;

// ✅ Place Order
export const placeOrder = async (cartItems, userEmail) => {
  const token = getToken();

  const order = {
    userEmail,
    items: cartItems.map(item => ({
      productName: item.name,
      quantity: 1,
      price: item.price
    }))
  };

  return axios.post(API_URL, order, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// ✅ Get Orders
export const getOrders = async (userEmail) => {
  const token = getToken();
  return axios.get(`${API_URL}/email/${userEmail}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

