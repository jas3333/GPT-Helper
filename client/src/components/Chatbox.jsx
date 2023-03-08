import { useEffect, useRef, memo } from 'react';
import { FaTools } from 'react-icons/fa';
import DisplayChat from './../components/DisplayChat';
import InputBox from './InputBox';

const MemoDisplayChat = memo(DisplayChat);

const Chatbox = ({
    promptQuestion,
    setPromptQuestion,
    handleSubmit,
    conversation,
    isLoading,
    setShowModal,
    showModal,
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [conversation]);

    return (
        <div className='chatbox' ref={containerRef}>
            {conversation.map((item, index) => {
                return <MemoDisplayChat key={index} item={item} />;
            })}
            <div className='chat-input'>
                <div className='user-input'>
                    <FaTools className='tools' onClick={() => setShowModal(!showModal)} />
                    {isLoading && <div className='loading-indicator'></div>}
                    <InputBox
                        handleSubmit={handleSubmit}
                        promptQuestion={promptQuestion}
                        setPromptQuestion={setPromptQuestion}
                    />
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
