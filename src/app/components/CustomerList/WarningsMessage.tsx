import React from 'react';

const WarningsMessage = ({ message }) => (
    message ? <p>{message}</p> : null
);

export default WarningsMessage;
