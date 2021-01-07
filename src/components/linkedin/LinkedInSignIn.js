import React from 'react';
import { connect } from 'react-redux';
import queryString from "query-string";
import {Alert} from "react-bootstrap";
import Notification from '../common/notification/Notification';
import constant from '../../shared/constant';
import * as sessionActions from '../../saga/session-saga';
const toast = new Notification()
class LinkedInSingIn extends React.Component {

    constructor(props){
        super(props);
        this.isVisited = false; 
        this.notification=null           
    }

    componentDidMount(){
        if(!this.isVisited){
            const { dispatch, history, t } = this.props;
            const queryParam = queryString.parse(this.props.location.search);

            const queryParamCode = queryParam && queryParam.code;
            const queryParamState = queryParam && queryParam.state; 
            const queryParamError = queryParam && queryParam.error; 
            const queryParamErrorDescription = queryParam && queryParam.error_description;
            let code = encodeURIComponent(queryParamCode); 
            let state = encodeURIComponent(queryParamState);
            let error = encodeURIComponent(queryParamError);
            let errorDescription = encodeURIComponent(queryParamErrorDescription);

            const data = {code, state};
            if(code != 'undefined'){
                dispatch(sessionActions.passLinkedinData(data, history, t('linkedin_signin.fail_message')))
            }
            else if(error != 'undefined'){
                // let errorData = {error, errorDescription: errorDescription.replace(/%20/g, " "), operation: 'signin'}
                toast.show(errorDescription.replace(/%20/g, " "), constant.error)
                history.push(constant.LOGIN_SCREEN);
            }
            else {
                // let errorData = {error, errorDescription: t('linkedin_signin.fail_message'), operation: 'signin'}
                toast.show(t('linkedin_signin.fail_message'), constant.error)
                history.push(constant.LOGIN_SCREEN);
            }
        }
    }

    componentWillUnmount(){
        this.isVisited = true
    }

    failResponseMessage = () =>{
        const {t} = this.props;
        return (
            <Alert bsStyle="danger">
                <h4>{t('linkedin_signin.fail')}</h4>
                <p>{t('linkedin_signin.fail_message')}</p>
            </Alert>
        )
    }

    render() {
        const {session} = this.props;
        const linkedinDataPassError =session.get('linkedinDataPassError');
        return (
            <section>
                <div className="container mt50">
                {linkedinDataPassError&&this.failResponseMessage()}
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => ({
    session: state.session
});

export default connect(mapStateToProps)(LinkedInSingIn);
