import * as React from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import * as loginActions from "../../saga/session-saga";
import constant from "./../../../src/shared/constant";
import Notification from '../common/notification/Notification';

class LoginContainer extends React.Component {

    constructor(props) {
        super(props)
    }

    handleLogin = (values) => {
        const { dispatch, history, fromPage, responseFromApi } = this.props;
       
        let redirectUrl = '';
        if (this.props.location.state != undefined || fromPage ) {
            if(fromPage)
            {
                redirectUrl = fromPage;
            }
            else
            {
                redirectUrl = this.props.location.state.from  ? this.props.location.state.from : '';
            }
      
        }
        dispatch(loginActions.login(values.email, values.password, history, redirectUrl,  ()=>responseFromApi && responseFromApi()));
    }

    render() {
        return (
            <LoginForm {...this.props} onLogin={this.handleLogin} />
        );
    }
}

export default LoginContainer;
