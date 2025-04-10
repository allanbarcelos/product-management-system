import axios from 'axios';

const API_URL = 'http://localhost:5000/api/order';

export const getOrders = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createOrder = async (order) => {
    const response = await axios.post(API_URL, order);
    return response.data;
};

