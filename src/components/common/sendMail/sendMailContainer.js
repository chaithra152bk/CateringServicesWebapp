import * as React from 'react';
import { connect } from 'react-redux';
import SendMailForm from './sendMailForm';
import * as mailActions from "../../../saga/send-mail-saga";

class SendMailContainer extends React.Component {
    constructor(props) {
        super(props);

    }

    closeModal = () => {
        const { modelRef } = this.props;
        modelRef.props.onHide();
    }

    handleSendMail = (data) => {
        const { t, dispatch, modelRef } = this.props;
        const mailDetails = { emailIds: [ data.emailId ], emailSubject: data.mailSubject, emailBody: data.description.replace(/\n/g,"<br/>") };
        dispatch(mailActions.sendMail(mailDetails, t, modelRef));
    }

    render() {
        const { emailId, mailSubject, mailBody, showSubject = true } = this.props;
        return (
            <div>
                <SendMailForm closeModal={this.closeModal} emailId={emailId} mailSubject={mailSubject} mailBody={mailBody} showSubject={showSubject} handleSendMail={this.handleSendMail} {...this.props}></SendMailForm>
            </div>
        );
    }
}

export default connect(null)(SendMailContainer);