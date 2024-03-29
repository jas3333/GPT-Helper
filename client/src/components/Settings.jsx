import { memo } from 'react';
const Settings = memo(({ botSettings, settingsChange, reset }) => {
    return (
        <div className='settings-modal'>
            <form className=''>
                <div className='settings'>
                    <label htmlFor='options'>Persona: </label>

                    <select id='options' onChange={settingsChange} name='persona' value={botSettings.persona}>
                        <option value='0'>Rhey - Programming/Network Expert</option>
                        <option value='1'>Rick - Rick and Morty</option>
                        <option value='2'>Eva - World Reknown Journalist</option>
                        <option value='3'>Reef - World Class Surfer</option>
                        <option value='4'>Ugg - The Caveman</option>
                        <option value='5'>AI Assistant - Default ChatGPT</option>
                    </select>
                    <label className='mg-left-20' htmlFor='tokens'>
                        Tokens:
                    </label>
                    <p className='width-40'>{botSettings.tokens}</p>

                    <input
                        className='slider'
                        id='tokens'
                        type='range'
                        min='50'
                        max='2050'
                        step='10'
                        name='tokens'
                        value={botSettings.tokens}
                        onChange={settingsChange}
                    />
                    <label className='mg-left-20' htmlFor='tokens'>
                        Temperature:
                    </label>
                    <p className='width-40'>{botSettings.temperature}</p>

                    <input
                        className='slider'
                        id='tokens'
                        type='range'
                        min='.1'
                        max='1'
                        step='.1'
                        name='temperature'
                        value={botSettings.temperature}
                        onChange={settingsChange}
                    />
                    <label className='mg-left-20' htmlFor='tokens'>
                        Top_P:
                    </label>
                    <p className='width-40'>{botSettings.top_p}</p>

                    <input
                        className='slider'
                        id='tokens'
                        type='range'
                        min='.1'
                        max='1'
                        step='.1'
                        name='top_p'
                        value={botSettings.top_p}
                        onChange={settingsChange}
                    />
                </div>
                <div className='settings'>
                    <label className='mg-left-20' htmlFor='tokens'>
                        Presence Penalty:
                    </label>
                    <p className='width-40'>{botSettings.presencePenalty}</p>

                    <input
                        className='slider'
                        id='tokens'
                        type='range'
                        min='-2'
                        max='2'
                        step='.1'
                        name='presencePenalty'
                        value={botSettings.presencePenalty}
                        onChange={settingsChange}
                    />
                    <label className='mg-left-20' htmlFor='tokens'>
                        Frequency Penalty:
                    </label>
                    <p className='width-40'>{botSettings.frequencyPenalty}</p>

                    <input
                        className='slider'
                        id='tokens'
                        type='range'
                        min='-2'
                        max='2'
                        step='.1'
                        name='frequencyPenalty'
                        value={botSettings.frequencyPenalty}
                        onChange={settingsChange}
                    />
                </div>
            </form>
            <div className='settings'>
                <button onClick={reset} className='btn'>
                    Reset
                </button>
            </div>
        </div>
    );
});

export default Settings;
