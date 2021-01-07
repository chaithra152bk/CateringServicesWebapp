import React from "react";
import { Route, Switch } from "react-router-dom";
import constant from "../shared/constant";
import Layout from "./layout/Layout";
import { PrivateCandidateRoute } from "./authRoutes/PrivateCandidateRoute";

import { PrivateRestrictRecruiterRoute } from "./authRoutes/PrivateRecruiterRestrictRoute";

import LoginContainer from "./login/loginContainer";
import HomePage from './homePageDetails/HomePage'
import orderContainer from "./PlaceOrder/OrderContainer";



import { GuestRoute } from "./authRoutes/GuestRoute";


import ReactGA from 'react-ga';

const Main = (props) => {
    ReactGA.pageview(window.location.pathname);
    return (
        <Layout {...props}>
            <Switch>
                {/* For working in development mode, uncoment the below route and comment the route of redirect */}
                <PrivateRestrictRecruiterRoute exact path="/" {...props} component={HomePage} />

                {/* <Route exact path="/" component={() => {
                    window.location.href = constant.HOME_PAGE_MAIN_WEBSITE;
                    return null;
                }} /> */}
                <GuestRoute path={constant.LOGIN_SCREEN} {...props} component={LoginContainer} />



                <PrivateCandidateRoute path='/orders' {...props} component={orderContainer} />

              


                <Route render={() => <ErrorPage {...props} />} />
            </Switch>
        </Layout>)
};

export default Main;