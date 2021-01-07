import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import constant from '../../shared/constant';
import * as sessionStorage from '../../utils/sessionStorage'
import * as helper from '../../utils/helper/helper';


export const PrivateRoute = ({ component: Component, ...rest }) => {
    const { auth, location } = rest;

    // const authData = JSON.parse(sessionStorage.getAuthToken());
    // const role = helper.fetchRole();

   
    
    return (
        <Route {...rest} render={(props) =>
            
                <Component {...rest} {...props} />
                
        } />
    );
};

PrivateRoute.propTypes = {

};