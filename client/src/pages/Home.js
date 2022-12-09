import { useEffect, useState } from 'react';
import axios from 'axios';

import Completion from '../components/Completion';
import Prompt from '../components/Prompt';
import PromptController from '../components/PromptController';

const Home = () => {
    const [loading, setLoading] = useState(false);

    const personas = {
        happy: 'Respond like a happy person that over uses emojis.',
        surfer: 'Respond like a california surfer.',
        grouch: 'Respond like a grouchy old programmer.',
        snob: 'Respond like a snob.',
        damsel: 'Respond like a damsel in distress.',
    };

    // Values for PromptController
    const [temperature, setTemperature] = useState(0.5);
    const [tokens, setTokens] = useState(512);
    const [nucleus, setNucleus] = useState(0.5);
    const [selectedModel, setSelectedModel] = useState('text-davinci-003');
    const [persona, setPersona] = useState(personas.happy);
    const [threadSize, setThreadSize] = useState(3);

    // Values for Prompt
    const [question, setQuestion] = useState('');
    const [conversation, setConversation] = useState('');

    // Crappy workaround to get markdown because I can't figure out how to separate regular text and code
    const promptOptions = `Respond in markdown and use a codeblock if there is code. ${persona} STOP`;

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

            prompt: `${promptOptions}${conversation}\nQ:${question}`,
            top_p: Number(nucleus),
            max_tokens: Number(tokens),
            temperature: Number(temperature),
            n: 1,
            stream: false,
            logprobs: null,
        };

        try {
            const response = await axios.post('https://api.openai.com/v1/completions', promptData, options);
            const newChat = {
                botResponse: response.data.choices[0].text,
                promptQuestion: question,
                totalTokens: response.data.usage.total_tokens,
            };
            console.log(chatResponse);

            // Allows the bot to remember previous questions
            console.log('Conversation', conversation);
            setQuestion('');
            setLoading(false);
            setChatResponse([...chatResponse, newChat]);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    // Scrolls to bottom of the page as new content is created
    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [chatResponse]);

    useEffect(() => {
        if (chatResponse.length > threadSize) {
            // Create a new array using the spread operator
            const newArray = [...chatResponse];
            // Use the splice method to remove excess elements from the array
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
        setConversation,
        nucleus,
        setNucleus,
        setPersona,
        persona,
        personas,
        setThreadSize,
        threadSize,
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
