import { useState } from "react";
import { useEffect } from "react";

const useAxios = ({ axiosInstance, url, method, data = null, headers = null, handleResponse, handleError}) => {
    const [responseData, setResponseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const controller = new AbortController();

    useEffect(() => {
        const signal = controller.signal;
        axiosInstance[method](url, data, headers, signal)
            .then(response => {
                 setResponseData(response.data);
                 handleResponse?.(response.data);
            })
            .catch(error => {
                 setError(error);
                 handleError?.(error.response);
            })
            .finally(() => setLoading(false)); 

        return () => controller.abort();
    }, [method, url, data, headers]);

    return {data: responseData, loading, error};
};

export default useAxios;