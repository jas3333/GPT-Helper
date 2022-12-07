const PromptController = ({ temperature, setTemperature, tokens, setTokens }) => {
    return (
        <div className='settings'>
            <form className='container-col'>
                <label htmlFor='temperature'>{`Temperature: ${temperature}`}</label>
                <input
                    type='range'
                    name='temperature'
                    value={temperature}
                    min='0'
                    max='1'
                    step='.1'
                    onChange={(event) => setTemperature(event.target.value)}
                />
                <label>{`Tokens: ${tokens}`}</label>
                <input
                    type='range'
                    name='tokens'
                    value={tokens}
                    min='5'
                    max='1024'
                    onChange={(event) => setTokens(event.target.value)}
                />
            </form>
        </div>
    );
};

export default PromptController;
