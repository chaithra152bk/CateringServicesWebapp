import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import constant from '../../shared/constant';
import * as sessionStorage from '../../utils/sessionStorage';
import * as helper from '../../utils/helper/helper';

export const GuestRoute = ({ component: Component, path, ...rest }) => {
    const { auth, location } = rest;
    const authData = JSON.parse(sessionStorage.getAuthToken());
    const role = helper.fetchRole();

    let navigateRoute = '';
    if (authData) {
        if (role == constant.RECRUITER_ROLE)
            navigateRoute = constant.RECRUITER_DASHBOARD;
        else
            navigateRoute = constant.CANDIDATE_PROFILE_EDIT_SCREEN;
    }

    return (
        <Route path={path} render={(props) =>
            !authData ?
                <Component {...rest} {...props} /> :
                <Redirect
                to={{
                    pathname: navigateRoute,
                    state: {
                        prevLocation: location
                    },
                }}/>
        } />
    );
};