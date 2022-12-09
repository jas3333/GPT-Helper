const Prompt = ({ question, setQuestion, onSubmit, loading }) => {
    return (
        <div className='container auto content-center align mg-bot-lg '>
            <form className='size-form-special ' onSubmit={onSubmit}>
                <input
                    type='text'
                    name=''
                    value={question}
                    className='input-text-lg full bg-mid'
                    placeholder='Ask a question'
                    onChange={(event) => setQuestion(event.target.value)}
                    autoFocus={true}
                />
            </form>
            <div className='loader '>{loading && <div className='spinner'></div>}</div>
        </div>
    );
};

export default Prompt;
