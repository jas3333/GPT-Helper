const PromptController = ({ temperature, setTemperature, tokens, setTokens, setSelectedModel }) => {
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
                    max='2000'
                    onChange={(event) => setTokens(event.target.value)}
                />
                <select className='mg-top-md pad-sm' onChange={(event) => setSelectedModel(event.target.value)}>
                    <option value='text-davinci-003'>Davinci</option>
                    <option value='text-curie-001'>Curie</option>
                    <option value='text-babbage-001'>Babbage</option>
                    <option value='text-ada-001'>Ada</option>
                </select>
            </form>
        </div>
    );
};

export default PromptController;
