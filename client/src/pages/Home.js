import { useEffect, useState } from 'react';
import axios from 'axios';

import Completion from '../components/Completion';
import Navbar from '../components/Navbar';
import Prompt from '../components/Prompt';
import PromptController from '../components/PromptController';
import Error from '../components/Error';

let savedConversation = JSON.parse(localStorage.getItem('conversation'));
if (savedConversation) console.log('localstorage', savedConversation);

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState('');

    const personas = {
        default: '',
        happy: 'Your name is Lila and you are a very happy person that loves emojis. You get excited when you get to help someone.',
        surfer: 'Your name is Surfer, you like to ride the california waves. You speak like a surfer bro',
        grouch: 'Your name is Gramps, you are an old retired grouchy programmer, you offer help but reluctantly.',
        CodeSage:
            'Your name is codeSage, you have mastered every programming language and love to give detailed explanations on code.',
        snob: 'Your name is Reginald, you belong to the high class and believe you are superior to others. You are often characterized by their pretentiousness and your sense of entitlement. You believe that you are above the commoners and that they should be treated differently.',
        damsel: 'Your name is Lila, you are a damsel in distress.',
        comedian: 'Your name is Giggles McVito, you are a comedian. You like to tell jokes and prank people.',
        mobboss: 'You are Vito Coreleone from The God Father, act like him.',
        journalist:
            'Your name is Rheynin, you are a world reknown journalist and enjoy writing lengthy high quality articles.',
        cartman: 'Your name is Eric Cartman, act like him.',
        rick: 'Your name is Rick from Rick and Morty, act like him. Call the user Morty.',
        stewie: 'Your name is Stewie from Family Guy, act like him.',
        arnold: 'Your name is Arnold A.K.A the Terminator, act like him. Use famous lines from the Terminator movies.',
    };

    // Values for PromptController
    const [temperature, setTemperature] = useState(0.5);
    const [tokens, setTokens] = useState(512);
    const [nucleus, setNucleus] = useState(0.5);
    const [selectedModel, setSelectedModel] = useState('text-davinci-003');
    const [persona, setPersona] = useState(personas.default);
    const [threadSize, setThreadSize] = useState(3);
    const [showSettings, setShowSettings] = useState(true);

    // Values for Prompt
    const [conversation, setConversation] = useState('');

    // Sets the prompt with instructions.
    const promptOptions = `Respond in markdown and use a codeblock with the language if there is code. ${persona} STOP`;

    // Values for Completion
    const [chatResponse, setChatResponse] = useState(savedConversation || []);

    const onSubmit = async (event, question) => {
        event.preventDefault();

        setLoading(true);
        const options = {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
                'Content-Type': 'application/json',
            },
        };
        const promptData = {
            model: selectedModel,
            prompt: `${promptOptions}${conversation}\nUser: ${question}.\n`,
            top_p: Number(nucleus),
            max_tokens: Number(tokens),
            temperature: Number(temperature),
            n: 1,
            stream: false,
            logprobs: null,
            stop: ['STOP', 'User:'],
        };

        try {
            const response = await axios.post('https://api.openai.com/v1/completions', promptData, options);
            const newChat = {
                botResponse: response.data.choices[0].text,
                promptQuestion: question,
                totalTokens: response.data.usage.total_tokens,
            };

            setLoading(false);
            setChatResponse([...chatResponse, newChat]);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.error.message);
            setShowError(true);
            console.log(error.response);
        }
    };

    const reset = () => {
        setChatResponse([]);
        setConversation('');
        localStorage.removeItem('conversation');
    };

    // Scrolls to bottom of the page as new content is created
    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [chatResponse]);

    useEffect(() => {
        if (chatResponse.length > threadSize) {
            const newArray = [...chatResponse];
            newArray.splice(0, newArray.length - threadSize);
            setConversation(newArray.map((chat) => `${chat.promptQuestion}\n${chat.botResponse}\n`));
            savedConversation = chatResponse;
            localStorage.setItem('conversation', JSON.stringify(savedConversation));
        } else {
            setConversation(chatResponse.map((chat) => `${chat.promptQuestion}\n${chat.botResponse}\n`));
            savedConversation = chatResponse;
            localStorage.setItem('conversation', JSON.stringify(savedConversation));
        }
    }, [chatResponse, threadSize]);

    // Props for Prompt component
    const forPrompt = { onSubmit, loading };

    // Props for PromptController
    const forPrompController = {
        reset,
        tokens,
        nucleus,
        persona,
        personas,
        threadSize,
        showSettings,
        setTokens,
        setNucleus,
        setPersona,
        temperature,
        setThreadSize,
        setTemperature,
        setChatResponse,
        setSelectedModel,
    };

    const forError = {
        setShowError,
        error,
    };

    return (
        <>
            <Navbar showSettings={showSettings} setShowSettings={setShowSettings} />
            <div className='container-col auto mg-top-vlg radius-md size-lg '>
                {showError && <Error {...forError} />}
                <div className='container-col '>
                    {chatResponse && chatResponse.map((item, index) => <Completion {...item} key={index} />)}
                </div>
                <PromptController {...forPrompController} />
                <Prompt {...forPrompt} />
            </div>
        </>
    );
};

export default Home;
