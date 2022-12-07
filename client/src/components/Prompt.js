const Prompt = ({ question, setQuestion, onSubmit, loading }) => {
    return (
        <div className='container full auto content-center align mg-bot-lg'>
            <form className=' full ' onSubmit={onSubmit}>
                <input
                    type='text'
                    name=''
                    value={question}
                    className='input-text-lg full pad-lg radius-md bg-mid'
                    placeholder='Ask a question'
                    onChange={(event) => setQuestion(event.target.value)}
                    autoFocus={true}
                />
            </form>
            {loading && <h2>loading</h2>}
        </div>
    );
};

export default Prompt;
