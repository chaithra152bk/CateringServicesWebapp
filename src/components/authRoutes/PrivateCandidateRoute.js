import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import constant from '../../shared/constant';
import * as helper from '../../utils/helper/helper';

export const PrivateCandidateRoute = ({ component: Component, ...rest }) => {
    const { auth, location } = rest;

    

    return (
        <Route {...rest} render={(props) =>   <Component {...rest} {...props} /> 

        } />
    );
};

PrivateCandidateRoute.propTypes = {

};