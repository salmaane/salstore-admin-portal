import axios from "axios";

const authInstance = axios.create({
    baseURL: import.meta.env.VITE_AUTHENTICATION_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default authInstance;