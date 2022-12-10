const Conversation = ({ data, restoreConversation }) => {
    return (
        <div
            className='container pad-lg size-sm radius-md shadow auto mg-top-md short pointer'
            onClick={() => restoreConversation(data._id)}
        >
            <h3>{data.title}</h3>
            <p>{data.description}</p>
        </div>
    );
};

export default Conversation;
