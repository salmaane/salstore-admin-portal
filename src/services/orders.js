import axios from "axios";

const ordersInstance = axios.create({
    baseURL: import.meta.env.VITE_ORDERS_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default ordersInstance;