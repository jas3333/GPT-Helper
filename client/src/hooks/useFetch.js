import { useEffect, useState } from 'react';

export const useFetch = (url) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getData = async () => {
        const response = await fetch(url);
        const data = await response.json();

        setData(data);
        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    return { loading, data };
};
