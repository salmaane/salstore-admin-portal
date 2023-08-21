import axios from "axios";

const usersInstance = axios.create({
    baseURL: import.meta.env.VITE_USERS_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default usersInstance;