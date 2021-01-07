import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "../common/form/TextField";
import * as helper from "../../utils/helper/helper"
import * as Yup from 'yup';
import loginFormStyles from "./loginFormStyles";
import themeStyle from '../../resources/themeStyle';
import { Link } from 'react-router-dom';
import constant from "./../../../src/shared/constant";
import { Button } from "../../components/common/button/Button";
import axios from 'axios';

class LoginForm extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    onLogin = (values) => {
        console.log("user", values)
        axios.post('/login', {
            email: values.email,
            password: values.password
        })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    }


    render() {
        const { t } = this.props;
        const values = { email: '', password: '' }
        const validationSchema = Yup.object().shape({
            email: Yup.string().email(t('validation.invalid_email'))
                .required(t('validation.required')),
            password: Yup.string().required(t('validation.required'))
        })

        return (
            <div>
                <Formik
                    initialValues={values}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        console.log('insidee', values)
                        this.props.onLogin(values)
                    }}
                    render={({ errors, touched }) => (
                        <div>
                            <Form>
                                <div className="simple-bg-screen">
                                    <div className="wrapper">
                                        <section className="login-screen-sec">
                                            <div className="container">
                                                <div className="login-screen">
                                                    <div><h2 className="heading-title text-alignment">{t('common.login_heading')}</h2></div>
                                                    <Field type="text" name="email" className="form-control" placeholder={t('common.email')} />
                                                    {errors.email && touched.email ? (<div className="error-message">{errors.email}</div>) : null}
                                                    <Field type="password" name="password" className="form-control" placeholder={t('common.password')} />
                                                    {errors.password && touched.password ? (<div className="error-message">{errors.password}</div>) : null}
                                                    <button className="btn btn-login" type="submit">{t('login.loginTitle')}</button>
                                                    <span>{t('login.no_account')}&nbsp;<Link to={constant.SIGNUP_SCREEN}>{t('common.create_account')}</Link></span>
                                                    <span><Link to={constant.FORGOT_PASSWORD_SCREEN}>{t('common.forgot_password')}</Link>
                                                    </span>
                                                    <div className="betweenLineText">{t('common.or')}</div>

                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    )}
                />
            </div>
        );
    }
}



export default LoginForm;
