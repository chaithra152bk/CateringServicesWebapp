import * as React from 'react';
import { connect } from 'react-redux';

import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import constant from "../../shared/constant";
import { Button } from '../common/button/Button';
import CutomForm1 from './form1';
import Footer from '../layout/Footer';




class HomePage extends React.Component {
	constructor(props) {
		super(props)
	}


	render() {
		const { t, history } = this.props;




		return (
			<div className="clearfix">
				<CutomForm1  {...this.props} />
				<Footer />
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	candidate: state.candidate
});

export default connect(mapStateToProps)(HomePage);

