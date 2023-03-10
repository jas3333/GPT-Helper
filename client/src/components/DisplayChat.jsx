import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const DisplayChat = ({ item }) => {
    const { botResponse } = item;
    return (
        <div>
            <div className='user-chat'>
                <p>{item.promptQuestion}</p>
            </div>
            <div className='flex-box'>
                <img className='profile-pic' src={require(`./../images/${item.profilePic}`)} alt='' />
                <div className='chat-bubble'>
                    <ReactMarkdown
                        children={botResponse}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        children={String(children).replace(/\n$/, '')}
                                        style={coldarkDark}
                                        language={match[1]}
                                        PreTag='div'
                                        {...props}
                                    />
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    />
                    <p className='tokens'>Tokens: {item.usage}</p>
                </div>
            </div>
        </div>
    );
};

export default DisplayChat;
