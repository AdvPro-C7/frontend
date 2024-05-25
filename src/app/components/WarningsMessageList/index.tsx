import React from 'react';

const WarningsMessage = ({ message }) => {
    console.log("WarningsMessage rendered with message:", message);
    return (
        message ? <p>{message}</p> : null
    );
};

export default WarningsMessage;