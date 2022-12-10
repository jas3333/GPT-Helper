import { useEffect, useState } from 'react';
import axios from 'axios';

import Completion from '../components/Completion';
import Prompt from '../components/Prompt';
import PromptController from '../components/PromptController';

const Home = () => {
    const [loading, setLoading] = useState(false);

    const personas = {
        default: '',
        happy: 'Respond like a happy person that over uses emojis.',
        surfer: 'Respond like a california surfer.',
        grouch: 'Respond like a grouchy old programmer.',
        wise: 'Respond like a wise programming with lots of detail.',
        snob: 'Respond like a snob.',
        damsel: 'Respond like a damsel in distress.',
        comedian: 'Respond like a comedian that tells lots of jokes.',
        mobboss: 'Respond like mob boss.',
        journalist: 'Respond like a prestigious journalist that writes descriptive articles.',
        cartman: 'Respond like Eric Cartman from South Park.',
        rick: 'Respond like Rick from Rick and Morty.',
        stewie: 'Respond like Stewie Griffon.',
    };

    // Values for PromptController
    const [temperature, setTemperature] = useState(0.5);
    const [tokens, setTokens] = useState(512);
    const [nucleus, setNucleus] = useState(0.5);
    const [selectedModel, setSelectedModel] = useState('text-davinci-003');
    const [persona, setPersona] = useState(personas.wise);
    const [threadSize, setThreadSize] = useState(3);

    // Values for Prompt
    const [question, setQuestion] = useState('');
    const [conversation, setConversation] = useState('');

    // Sets the prompt with instructions.
    const promptOptions = `Respond in markdown and use a codeblock with the language if there is code. Your name is ChatBot. ${persona} STOP`;

    // Values for Completion
    const [chatResponse, setChatResponse] = useState([]);

    const onSubmit = async (event) => {
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

            console.log(chatResponse);
            console.log('Conversation', conversation);

            setQuestion('');
            setLoading(false);
            setChatResponse([...chatResponse, newChat]);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const reset = () => {
        setChatResponse([]);
        setConversation('');
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
        } else {
            setConversation(chatResponse.map((chat) => `${chat.promptQuestion}\n${chat.botResponse}\n`));
        }
    }, [chatResponse, threadSize]);

    // Props for Prompt component
    const forPrompt = { question, setQuestion, onSubmit, loading };

    // Props for PromptController
    const forPrompController = {
        temperature,
        setTemperature,
        tokens,
        setTokens,
        setSelectedModel,
        nucleus,
        setNucleus,
        setPersona,
        persona,
        personas,
        setThreadSize,
        threadSize,
        setChatResponse,
        reset,
    };

    return (
        <div className='container-col auto mg-top-lg radius-md size-lg '>
            <div className='container-col '>
                {chatResponse && chatResponse.map((item, index) => <Completion {...item} key={index} />)}
            </div>
            <PromptController {...forPrompController} />
            <Prompt {...forPrompt} />
        </div>
    );
};

export default Home;
