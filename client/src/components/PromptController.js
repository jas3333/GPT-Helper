const PromptController = ({
    temperature,
    setTemperature,
    tokens,
    setTokens,
    setSelectedModel,
    setConversation,
    nucleus,
    setNucleus,
    stopTokens,
    setStopTokens,
}) => {
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
                    title='This will adjust the randomness of the conversation. Setting to 0 will be straightforward, setting to 1 will be more random.'
                />
                <label>{`top_p: ${nucleus}`}</label>
                <input
                    type='range'
                    name='top_p'
                    value={nucleus}
                    min='0'
                    max='1'
                    step='.1'
                    onChange={(event) => setNucleus(event.target.value)}
                    title='The top_p parameter is used to control the diversity of the generated text. The higher the value the more diverse the generated text will be.'
                />
                <label>{`Tokens: ${tokens}`}</label>
                <input
                    type='range'
                    name='tokens'
                    value={tokens}
                    min='5'
                    max='2048'
                    onChange={(event) => setTokens(event.target.value)}
                    title='Sets max_token parameter in the api call. GPT will not generate more than the set tokens. This setting does not stop requests at the set tokens.'
                />
                <select
                    className='mg-top-md pad-sm'
                    onChange={(event) => setSelectedModel(event.target.value)}
                    title='Change the model.'
                >
                    <option value='text-davinci-003'>Davinci</option>
                    <option value='code-davinci-002'>Code-Davinci</option>
                    <option value='text-curie-001'>Curie</option>
                    <option value='text-babbage-001'>Babbage</option>
                    <option value='text-ada-001'>Ada</option>
                </select>
            </form>
            <button
                className='btn mg-top-md'
                title='Reset the conversation thread. As the conversation gets bigger, so will the token requirements.'
                onClick={() => setConversation('')}
            >
                Reset
            </button>
        </div>
    );
};

export default PromptController;
