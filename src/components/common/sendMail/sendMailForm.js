import * as React from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';

class SendMailForm extends React.Component {
    constructor(props) {
        super(props)
    }

    sectionButton = (t) => {
        return <React.Fragment>
            <div className="detail-pannel-footer-btn pull-right">
                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        <button className="btn btn-login small-screen-button" type="submit">{t('send_mail.send_btn')}</button>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <button className="btn btn-login small-screen-button" onClick={() => this.props.closeModal()} type="button">{t('common.cancel')}</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    }

    sendMailRenderForm = () => {
        const { t, handleSendMail, emailId, mailSubject, mailBody, showSubject, showEmail } = this.props;
        const values = { description: mailBody || '', emailId: emailId || '', mailSubject: mailSubject || '' }
        const validationSchema = Yup.object().shape({
            emailId: Yup.string().email(t('validation.invalid_email'))
                .required(t('validation.required')),
            mailSubject: Yup.string().required(t('validation.required')),
            description: Yup.string().required(t('validation.required'))
        })

        return <Formik
            initialValues={values}
            validationSchema={validationSchema}
            onSubmit={values => {
                handleSendMail(values)
            }}
            render={({ errors, touched }) => (

                <section className="full-detail">
                    <div className="containerModal">
                        <div className="row bottom-mrg extra-mrg">
                            <Form>
                                <div className="col-md-12 col-sm-12">
                                    <div className="share-job-form-filled-wrapper">
                                        {showEmail ? <h5>{t('common.email_address')}</h5> :null}
                                        {showEmail ? <Field type="text" name="emailId" className="form-control" placeholder={t('common.email_address')} disabled={emailId} /> :null}
                                        {errors.emailId && touched.emailId ? (<div className="error-message">{errors.emailId}</div>) : null}
                                        {showSubject ? <h5>{t('send_mail.mail_subject')}</h5> : null}
                                        {showSubject ? <span> <Field type="text" name="mailSubject" className="form-control" placeholder={t('send_mail.mail_subject')} /> 
                                       {errors.mailSubject && touched.mailSubject ? (<div className="error-message">{errors.mailSubject}</div>) : null}</span>
                                        : null}
                                        <div><h5>{t('common.email_body')}</h5></div>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-list-alt"></i></span>
                                            <Field name="description" component="textarea" className="form-control" rows="5" placeholder={t('common.email_body')} />
                                        </div>
                                        {errors.description && touched.description ? (<div className="error-message">{errors.description}</div>) : null}
                                        
                                    </div>
                                </div>
                                <div className="detail pannel-footer">
                                    <div className="col-md-12 col-sm-12">
                                        {this.sectionButton(t)}
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </section>
            )}
        />
    }

    render() {
        return (
            this.sendMailRenderForm()
        );
    }
}

export default (SendMailForm);