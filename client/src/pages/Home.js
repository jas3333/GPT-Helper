import { useEffect, useState } from 'react';
import axios from 'axios';

import Completion from '../components/Completion';
import Prompt from '../components/Prompt';
import PromptController from '../components/PromptController';

const Home = () => {
    const [loading, setLoading] = useState(false);

    // Values for Prompt
    const [question, setQuestion] = useState('');

    // Crappy workaround to get markdown because I can't figure out how to separate regular text and code
    const promptOptions = 'Respond in markdown.';

    // Values for Completion
    const [chatResponse, setChatResponse] = useState([]);

    // Values for PromptController
    const [temperature, setTemperature] = useState(0);
    const [tokens, setTokens] = useState(512);
    const [selectedModel, setSelectedModel] = useState('text-davinci-003');

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(Number(tokens));

        setLoading(true);
        const options = {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
                'Content-Type': 'application/json',
            },
        };
        const promptData = {
            model: selectedModel,
            prompt: `${question} ${promptOptions}`,
            max_tokens: Number(tokens),
            temperature: Number(temperature),
            n: 1,
            stream: false,
            logprobs: null,
        };
        console.log(promptData);

        try {
            const response = await axios.post('https://api.openai.com/v1/completions', promptData, options);

            const newChat = {
                botResponse: response.data.choices[0].text,
                promptQuestion: question,
            };

            setQuestion('');

            setLoading(false);
            setChatResponse([...chatResponse, newChat]);
            console.log(response);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [chatResponse]);

    const forPrompt = { question, setQuestion, onSubmit, loading };
    const forPrompController = { temperature, setTemperature, tokens, setTokens, setSelectedModel };

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