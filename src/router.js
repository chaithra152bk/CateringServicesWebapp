import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { baseUrl } from './services/config/environment';
import App from './components/App';
import ScrollToTop from '../utils/ScrollToTop';
class Router extends Component {
    constructor(props){
        super(props);
        const {translation} = this.props;
        const language = translation.get('language');
        this.props.lang(language);
    }

    componentDidUpdate(){
        const {translation} = this.props;
        const language = translation.get('language');
        if(language != '' && language != undefined && language)
            this.props.lang(language);
    }

    render() {
        return (    
            <BrowserRouter > 
                <ScrollToTop>
                    <App />
                </ScrollToTop>
            </BrowserRouter>    
        );
    }
}

const mapStateToProps = (state) => ({
    translation: state.translation
});

Router.propTypes = {
    translation: PropTypes.object,
    lang: PropTypes.func
};

export default connect(mapStateToProps)(Router);
