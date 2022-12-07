const Loading = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    return (
        <div className='modal' style={style}>
            <div className='css-loader'>Loading</div>
        </div>
    );
};

export default Loading;
