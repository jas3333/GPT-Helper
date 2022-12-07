import { useState } from 'react';
import axios from 'axios';

import Completion from '../components/Completion';
import Loading from '../components/Loading';
import Prompt from '../components/Prompt';
import PromptController from '../components/PromptController';

const Home = () => {
    const [loading, setLoading] = useState(false);

    // Values for Prompt
    const [question, setQuestion] = useState('');
    const promptOptions = 'Format your response to the question to markdown.';

    // Values for Completion
    const [chatResponse, setChatResponse] = useState([]);

    // Values for PromptController
    const [temperature, setTemperature] = useState(5);
    const [tokens, setTokens] = useState(256);

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
            model: 'text-davinci-003',
            prompt: `${question} ${promptOptions}`,
            max_tokens: Number(tokens),
            n: 1,
            stream: false,
            logprobs: null,
        };

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

    const forPrompt = { question, setQuestion, onSubmit, loading };
    const forPrompController = { temperature, setTemperature, tokens, setTokens };

    return (
        <div className='container-col auto mg-top-lg radius-md '>
            <div className='container content-center'>
                <div className='container-col '>
                    {chatResponse && chatResponse.map((item, index) => <Completion {...item} key={index} />)}
                </div>
                <PromptController {...forPrompController} />
            </div>
            <Prompt {...forPrompt} />
        </div>
    );
};

export default Home;
