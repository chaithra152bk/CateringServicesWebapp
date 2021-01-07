import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import * as translation from "../actions/action-translation";
import * as moment from "../utils/helper/moment";
import Main from "./main";
import { toast } from 'react-toastify';
import ToastNotification from './common/notification/toastNotification'
import Notification from './common/notification/Notification';
import constant from "../shared/constant";
import ReactGA  from 'react-ga';
import cookie from 'react-cookies';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };        
        // this.not.show('some')
        this.notification = ''
        ReactGA.initialize(constant.GA_ID);
    }
   


    render() {
        const { translation, session } = this.props
       const  cookieText= cookie.select(/\bCookieAccepted?\b/g) 
        const language = translation.get('language')
        const sessionData = session.get('userData');
        return (
            <div>
                <Main {...this.props} noti={this.notification}  selectedLanguage={language} userData={sessionData} />
                <Notification ref={(ref) => this.notification = ref} />
               
               
            </div>
        );
    }
}

App.propTypes = {};

const mapStateToProps = (state) => ({
    notificationData: state.notificationData,
    apiProgress: state.root,
    translation: state.translation,
    session: state.session
});

export default withRouter(translate('common')(connect(mapStateToProps)(App)));

