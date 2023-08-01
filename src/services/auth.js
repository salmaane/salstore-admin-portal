import axios from "axios";

const authInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/login',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default authInstance;