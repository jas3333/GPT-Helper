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
                conversation: [...conversation],
            });
            const newChat = {
                promptQuestion,
                botResponse: response.data.message,
                profilePic: response.data.profilePic,
                usage: response.data.usage,
            };
            if (conversation.length > 100) {
                setConversation(conversation.shift());
            }
            setConversation([...conversation, newChat]);
            localStorage.setItem('conversation', JSON.stringify([...conversation, newChat]));
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
        setPromptQuestion('');
    };

    const reset = async () => {
        setConversation([]);
        localStorage.removeItem('conversation');
    };

    useEffect(() => {
        const savedConversation = localStorage.getItem('conversation');
        if (savedConversation) {
            setConversation(JSON.parse(savedConversation));
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
