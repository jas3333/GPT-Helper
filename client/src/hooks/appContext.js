import { useContext, createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [botSettings, setBotSettings] = useState({
        persona: 0,
        tokens: 500,
        temperature: 0.5,
        presencePenalty: 0,
        frequencyPenalty: 0,
        top_p: 0.1,
    });

    const forSettings = {
        botSettings,
        setBotSettings,
    };

    return <AppContext.Provider value={forSettings}>{children}</AppContext.Provider>;
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
