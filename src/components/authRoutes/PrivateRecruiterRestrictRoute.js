import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import constant from '../../shared/constant';
import * as helper from '../../utils/helper/helper';

export const PrivateRestrictRecruiterRoute = ({ component: Component, ...rest }) => {
    const { auth, location } = rest;
    const role = helper.fetchRole();
    let isRecruiter = false;
    if (role == constant.RECRUITER_ROLE) {
        isRecruiter = true;
    }
    const adminRol = isRecruiter == true ? true : false;
    return (
        <Route {...rest} render={(props) =>
            !adminRol ?
            <Component {...rest} {...props} /> :
            <Redirect to={{ 
                pathname: constant.RECRUITER_DASHBOARD, 
                state: {
                    prevLocation: location
                }
            }} />
        } />
    );
};

PrivateRestrictRecruiterRoute.propTypes = {

};