import React from 'react';
import PropTypes from 'prop-types';

const Message = (props) =>
{
    let alert = '';
    if(props.error == true){
        alert = 'alert alert-danger mt-4';
    }
    else
    {
       alert = 'alert alert-success mt-4'; 
    }

    return (
        <div className={alert}>
            <strong>{props.message}</strong>
        </div>
    );
};

Message.propTypes = {
message: PropTypes.string,
error: PropTypes.bool
};
export default Message;