import React from 'react';

type WarningsMessageProps = {
    message: string;
};

const WarningsMessage: React.FC<WarningsMessageProps> = ({ message }) => {
    console.log("WarningsMessage rendered with message:", message);
    return (
        message ? <p>{message}</p> : null
    );
};

export default WarningsMessage;