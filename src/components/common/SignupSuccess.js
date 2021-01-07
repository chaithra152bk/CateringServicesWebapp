import React from 'react';
import PropTypes from 'prop-types';

export const SignupSuccess = (props) =>
{
     const {t} = props;
    return(
        <div className="col-md-12">
            <div className="row py-2">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                <div className="alert alert-success text-center" role="alert">
                <div>{t('sign_up.thanks_message_one')}</div>
                <div>{t('sign_up.thanks_message_two')}</div> 
                </div>
                </div>
                <div className="col-md-2"></div>
            </div>
           
           
        </div>
    );
};

SignupSuccess.propTypes = {
 t: PropTypes.func
};

export default SignupSuccess;