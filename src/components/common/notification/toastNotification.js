import React from 'react';
import Button from "../button/Button";
import themeStyle from '../../../resources/themeStyle';
import { ToastContainer, toast } from 'react-toastify';

export default class ToastNotification extends React.Component {

    render() {
        const props = this.props;

        return (
            <div style={themeStyle.commonWidth}>
                {this.props.notifyData.message ?
                    <ToastContainer toastClassName="toast" autoClose={4000} closeOnClick={true} position="top-center" />
                    : null}
            </div>
        );
    }
}