import { useEffect, useState, memo } from 'react';
import axios from 'axios';
import Chatbox from './components/Chatbox';
import Settings from './components/Settings';

const MemoChatbox = memo(Chatbox);

function App() {
    const [promptQuestion, setPromptQuestion] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(true);

    const [botSettings, setBotSettings] = useState({
        persona: 0,
        tokens: 500,
        temperature: 0.5,
        presencePenalty: 0,
        frequencyPenalty: 0,
        top_p: 0.1,
    });

    const settingsChange = (event) => {
        setBotSettings((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event, promptQuestion) => {
        event.preventDefault();

        try {
            setIsLoading(true);
            const response = await axios.post('/api/v1/gpt', {
                promptQuestion,
                ...botSettings,
            });
            const newChat = {
                promptQuestion,
                botResponse: response.data.message,
                profilePic: response.data.profilePic,
            };
            setConversation([...conversation, newChat]);

            localStorage.setItem('conversation', JSON.stringify([...conversation, newChat]));
        } catch (error) {
            console.log(error.message);
        }
        setIsLoading(false);
        setPromptQuestion('');
    };

    const reset = async () => {
        try {
            const response = await axios.post('/api/v1/gpt/reset');
            console.log(response.data.message);
            setConversation([]);
            localStorage.removeItem('conversation');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const savedConversation = localStorage.getItem('conversation');
        if (savedConversation) {
            setConversation(JSON.parse(savedConversation));
        }

        try {
            const response = axios.post('/api/v1/gpt/load');
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const chatboxProps = {
        handleSubmit,
        promptQuestion,
        setPromptQuestion,
        conversation,
        isLoading,
        setShowModal,
        showModal,
    };

    const settings = {
        botSettings,
        setBotSettings,
        settingsChange,
        reset,
    };

    return (
        <div>
            {showModal && <Settings {...settings} />}
            <MemoChatbox {...chatboxProps} />
        </div>
    );
}

export default App;
