import { useEffect, useState } from "react";

export default function (axiosInstance) {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [controller, setController] = useState();

    const axiosFetch = ({url = '', method, data = null, headers = null}) => {
        setLoading(true);
        const ctrl = new AbortController();
        setController(ctrl);

        axiosInstance({
            method, url, data, headers, signal: ctrl.signal
        })
        .then(response => 
            setData(response.data)
        )
        .catch(error => 
            setError(error.response)
        )
        .finally(() => 
            setLoading(false)
        );
    }

    useEffect(() => {

        return () => {
            controller?.abort();
        };
    }, [controller]);

    return [data, error, loading, axiosFetch];
}