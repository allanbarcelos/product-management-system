import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 1000,
});

export default{
    getProducts(){
        return apiClient.get('/api/product');
    },
};