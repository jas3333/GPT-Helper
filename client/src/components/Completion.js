import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
const Completion = ({ botResponse, promptQuestion }) => {
    return (
        <div className='container-col bg-mid pad-lg mg-top-md mg-bot-md radius-md '>
            <h3>You: {promptQuestion}</h3>
            <div className='underline-full mg-top-sm mg-bot-sm'></div>
            <h3>GPT:</h3>
            <div className='underline-min'></div>

            <ReactMarkdown
                children={botResponse}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <SyntaxHighlighter
                                children={String(children).replace(/\n$/, '')}
                                style={dracula}
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
        </div>
    );
};

export default Completion;
