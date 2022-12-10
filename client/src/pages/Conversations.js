import { useState, useEffect } from 'react';
import axios from 'axios';

import Conversation from '../components/Conversation';

const Conversations = ({ setChatResponse, chatResponse }) => {
    const [data, setData] = useState([]);

    const restoreConversation = (id) => {
        const restored = data.filter((item) => item._id === id);
        const conversations = restored[0].conversation.slice(0, restored[0].conversation.length);

        setChatResponse(conversations);
    };

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api');
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='container-col mg-top-vlg auto full'>
            <h2 className='text-center'>Conversation Storage</h2>
            <div className='underline-mid'></div>
            <div className='container auto eighty '>
                {data.map((item) => (
                    <Conversation data={item} key={item._id} restoreConversation={restoreConversation} />
                ))}
            </div>
        </div>
    );
};

export default Conversations;
