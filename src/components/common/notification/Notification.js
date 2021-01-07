
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    show(message, type) {
        let messageDuration = 3000;
        switch (type) {
            case 'error':
                toast.error(message, { autoClose: messageDuration });
                break;
            case 'success':
                toast.success(message, { autoClose: messageDuration });
                break;
            default:
                toast.info(message, { autoClose: messageDuration });
                break;
        }
    }

    render() {
        return (
            <ToastContainer toastClassName="toast" autoClose={3000} closeOnClick={true} position="top-center" />
        );
    }
}

export default Notification;
