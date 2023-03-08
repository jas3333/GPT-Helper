import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../hooks/appContext';

const GptApi = ({ promptQuestion }) => {
    const { botSettings } = useGlobalContext();
    const [botResponse, setBotResponse] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:4001/api/v1/gpt', {
                    promptQuestion,
                    ...botSettings,
                });
                setBotResponse(response.data.message);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [promptQuestion, botSettings]);

    return { botResponse };
};

export default GptApi;
