import React from "react";
import constant from "../../shared/constant";
import { JobList } from '../common/jobList/jobList'

class ErrorPage extends React.Component {

    constructor(props) {
        super(props)
    }


    render() {
        const { t } = this.props;

        return <div>
            <div className="clearfix"></div>
            <section className="simple-bg-screen big-wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <div className="error-page">
                                <h2>4<span>0</span>4</h2>
                                <p>{t('error_page.error_msg')} </p>
                                <a className="btn btn-success small-btn" href={constant.HOME_PAGE_MAIN_WEBSITE}>{t('error_page.error_btn')}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    }
}

export default ErrorPage;


