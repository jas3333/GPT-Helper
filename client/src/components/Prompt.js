import { useState } from 'react';

const Prompt = ({ onSubmit, loading }) => {
    const [rows, setRows] = useState(1);
    const [question, setQuestion] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && event.shiftKey && rows !== 5) {
            setRows(rows + 1);
        }
    };

    const handleSubmit = async (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            setRows(1);
            await onSubmit(event, question);
            setQuestion('');
        }
    };
    return (
        <div className='container auto content-center align mg-bot-lg '>
            <div className='container '>
                <form onKeyDown={handleKeyDown}>
                    <textarea
                        rows={rows}
                        resize='none'
                        value={question}
                        onChange={(event) => setQuestion(event.target.value)}
                        cols='50'
                        className='input-text bg-mid '
                        onKeyDown={handleSubmit}
                        autoFocus={true}
                        placeholder='Ask a question'
                    />
                </form>
                <div className='loader '>{loading && <div className='spinner '></div>}</div>
            </div>
        </div>
    );
};

export default Prompt;
