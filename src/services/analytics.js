import axios from "axios";

const analyticsInstance = axios.create({
    baseURL: import.meta.env.VITE_ANALYTICS_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default analyticsInstance;