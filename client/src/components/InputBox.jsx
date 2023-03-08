import { useState } from 'react';
const InputBox = ({ handleSubmit }) => {
    const [question, setQuestion] = useState('');

    const onSubmit = async (event) => {
        await handleSubmit(event, question);
        setQuestion('');
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    className='input-chat'
                    type='text'
                    name='question'
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder='Ask a question'
                />
            </form>
        </>
    );
};

export default InputBox;
