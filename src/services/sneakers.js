import axios from "axios";

const sneakersInstance = axios.create({
    baseURL: import.meta.env.VITE_SNEAKERS_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default sneakersInstance;