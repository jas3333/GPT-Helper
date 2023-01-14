import { useEffect } from 'react';

const Error = ({ error, setShowError }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowError(false);
        }, 8000);
        return () => clearTimeout(timeout);
    }, [setShowError]);

    return (
        <div className='container full bg-error pad-lg radius-sm mg-bot-sm content-center'>
            <h3>{error}</h3>
        </div>
    );
};

export default Error;
