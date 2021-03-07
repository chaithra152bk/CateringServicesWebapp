import * as React from 'react';
import { connect } from 'react-redux';

import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import constant from "../../shared/constant";
// import { Button } from '../common/button/Button';
import CutomForm1 from './form1';
import { Button } from 'react-bootstrap';

import Footer from '../layout/Footer';
import { FormGroup, ControlLabel } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import eventData from '../../data/Dishes.json';
import { NavLink } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';


class HomePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			options: null,
			eventArray: [],
			subEventArray: [],
			userName: '',
			email: '',
			contactNumber: '',
			eventAddress: '',
			eventDate: new Date(),
			userType: null,
			pinCode: null,
			eventType: eventData.eventType[0].eventTypeId || null,
			eventName: eventData.eventType[0].eventName || '',
			subEventType: 8 || null,
			subEventName: "Wedding" || '',
			errorHelp: '',
			errormsg: ''
		};
		this.eventFilterArray = eventData.eventType[0]
		this.indoptions = eventData.eventType
		this.error = ''
		// const focusing = index === lastSubmittedIndex + 1 ? true : false;
		// this.setInputFocus = this.setInputFocus.bind(this);

	}

	eventTypeChange = (event) => {
		let eventId = event.target.value
		let arrayIndex = this.state.eventArray.findIndex(value => value.eventTypeId == eventId)
		let filterArray = this.state.eventArray.filter(value => value.eventTypeId == eventId)
		filterArray.map((item) => {
			this.setState({ eventType: item.eventTypeId })
			this.setState({ eventName: item.eventName })

		})
		if (arrayIndex > -1) {
			this.setState({ subEventArray: this.state.eventArray[arrayIndex].subEventTypes })
			// this.setState({ subEventType: this.state.subEventArray[0].subEventId })
			// this.setState({ subEventName: this.state.subEventArray[0].subEventName })

		}
		else {

		}
	}

	subEventTypeChange = (event) => {
		let subEventId = event.target.value
		let arraySub = this.state.subEventArray.findIndex(value => value.subEventId == subEventId)
		let subArray = this.state.subEventArray.filter(value => value.subEventId == subEventId)
		subArray.map((item) => {
			this.setState({ subEventType: item.subEventId })
			this.setState({ subEventName: item.subEventName })

		})
	}

	onUserNameChange = async (event) => {
		this.setState({ userName: await event.target.value })
	}

	onEmailChange = async (event) => {
		this.setState({ email: await event.target.value })
		// const pattern = /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
		// const isValid = event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);


	}

	onContactNumberChange = async (event) => {
		this.setState({ contactNumber: await event.target.value })
		// this.getValidationState()

	}

	onEventAddressChange = (event) => {


		this.setState({ eventAddress: event.target.value })
	}

	onEventDateChange = async (date) => {
		if (date > new Date()) {
			this.setState({ eventDate: await date })
			{ this.state.errormsg ? (<div className="error-message">{this.state.errormsg}</div>) : null }
			this.setState({ errormsg: '' })
		}
		else {
			this.setState({ errormsg: "Date should be future date" })
		}
	}

	onPincodeChange = (event) => {
		this.setState({ pinCode: event.target.value })
	}

	handleChange = async (value) => {
		if (value === 1) {
			this.setState({ eventArray: await eventData.eventType })
		} else {
			this.setState({ eventArray: [] })
			this.setState({ subEventArray: [] })
		}

		this.setState({ userType: value })
	}


	render() {
		// const { t } = this.props;
		const values = {
			userName: this.state.userName, contactNumber: this.state.contactNumber, email: this.state.email,
			pinCode: this.state.pinCode
		}
		var compare = /^[0-9]{1,10}$/g

		const validationSchema = Yup.object().shape({
			email: Yup.string().email('Please Enter Valid Email Address'),
			// userName: Yup.string().required('userName Required'),
			contactNumber: Yup.string().matches(compare, "it allows only digits").max(10, "allow only 10 number"),
			// eventAddress: Yup.string().required("Address Required"),
			// pinCode: Yup.string().required("PinCode Required")

		})

		console.log("values", values)

		return (
			<div>
				<Formik
					initialValues={values}
					validationSchema={validationSchema}
					onSubmit={values => {
						// this.props.onLogin(values);
						this.props.history.push({
							pathname: '/orders',
							state: {
								userName: this.state.userName, contactNumber: this.state.contactNumber, email: this.state.email,
								eventAddress: this.state.eventAddress, eventDate: this.state.eventDate, userType: this.state.userType,
								eventType: this.state.eventType, eventName: this.state.eventName, subEventTypeId: this.state.subEventType,
								subEventName: this.state.subEventName, pinCode: this.state.pinCode
							}
						})

					}}
					render={({ errors, touched }) => (
						<div >
							<Row xs={1} md={1} style={{ height: '100%' }}>
								<Col md={7} sm={0} className="col-md-7 col-sm-12 no-padd bl-darken verticalAlignCenter">



									{/* <img src={require(`../../assets/images/buffet.jpg`)} style={{ width: '100%', height: '100%', backgroundPosition: 'cover', marginBottom: 5 }} alt="" /> */}

								</Col>
								<Col md={5} sm={12} style={{ marginTop: '15px' }}>


									<Form>
										<div className="simple-bg-screen">
											<div className="wrapper">
												<section>
													<div>
														<div className="login-screen">
															<FormGroup as={Row} controlId="formHorizontalEmail">
																<Col componentClass={ControlLabel} sm={2}>
																	<div>Name: </div>
																</Col>
																<Col sm={10}>
																	<Field type="text" name="userName" value={this.state.userName} className="form-control" placeholder={'UserName'} onChange={(event) => this.onUserNameChange(event)} />
																	{errors.userName && touched.userName ? (<div className="error-message">{errors.userName}</div>) : null}
																</Col>
															</FormGroup>
															<FormGroup as={Row} controlId="formHorizontalEmail">
																<Col componentClass={ControlLabel} sm={2}>
																	<div>Email: </div>
																</Col>
																<Col sm={10}>
																	<Field type="text" name="email" value={this.state.email} className="form-control" placeholder={'Email'} onChange={(event) => this.onEmailChange(event)} />
																	{errors.email && touched.email ? (<div className="error-message">{errors.email}</div>) : null}
																</Col>
															</FormGroup>
															<FormGroup as={Row} controlId="formHorizontalEmail">
																<Col componentClass={ControlLabel} sm={2}>
																	<div>Phone:</div>
																</Col>
																<Col sm={10}>
																	<Field maxLength="10"
																		name="contactNumber" value={this.state.contactNumber} className="form-control" placeholder={'ContactNumber'} onChange={(event) => this.onContactNumberChange(event)} />
																	{errors.contactNumber && touched.contactNumber ? (<div className="error-message">{errors.contactNumber}</div>) : null}
																</Col>
															</FormGroup>
															<FormGroup as={Row} controlId="formHorizontalEmail">
																<Col componentClass={ControlLabel} sm={2}>
																	<div style={{ marginLeft: '-53px', whiteSpace: 'text-wrap' }}>Event Address:</div>
																</Col>
																<Col sm={10}>
																	<Field type="text" name="eventAddress" value={this.state.eventAddress} className="form-control" placeholder={'Event Address'}
																		onChange={(event) => this.onEventAddressChange(event)} />
																	{errors.eventAddress && touched.eventAddress ? (<div className="error-message">{errors.eventAddress}</div>) : null}
																</Col>
															</FormGroup>

															<FormGroup as={Row} controlId="formHorizontalEmail">
																<Col componentClass={ControlLabel} sm={2}>
																	<div className="oldlabelContainer">Event Date:</div>
																</Col>
																<Col sm={10}>
																	<DatePicker
																		style={{ width: "207%" }}
																		className="form-control"
																		value={this.state.eventDate}
																		selected={this.state.eventDate}
																		onChange={(date) => this.onEventDateChange(date)}
																		showTimeSelect
																		timeFormat="HH:mm"
																		timeIntervals={12}
																		dateFormat="dd/MM/yyyy  HH:mm a"
																	/>
																</Col>
															</FormGroup>
															{this.state.errormsg ? (<div className="error-message">{this.state.errormsg}</div>) : null}
															<FormGroup as={Row} controlId="formHorizontalEmail" style={{ marginBottom: 10 }}>
																<Col componentClass={ControlLabel} sm={2}>
																	<div className="oldlabelContainer">User Type:</div>
																</Col>
																<Col sm={5}>
																	<span style={{ color: 'gray', fontWeight: 'bold' }}>
																		<input type="radio" name="site_name" style={{}}
																			onChange={(e) => this.handleChange(1)}
																		/>    Individual</span>
																</Col>
																<Col sm={5}>
																	<span style={{ color: 'gray', fontWeight: 'bold' }}>  <input type="radio" name="site_name" style={{ marginBottom: 30, color: 'black', fontWeight: 'bold' }}

																		onChange={(e) => this.handleChange(2)}
																	/>   Organization</span>
																</Col>
															</FormGroup>

															<FormGroup as={Row} controlId="formHorizontalEmail">
																<Col componentClass={ControlLabel} sm={2}>
																	<div className="oldlabelContainer">Event Type:</div>
																</Col>

																<Col sm={10}>
																	{/* {this.state.eventArray && this.state.eventArray.map((value, index) => <option key={index} value={value.eventTypeId} >{value.eventName}</option>)} */}
																	<Field component="select" name="gender" onChange={(event) => this.eventTypeChange(event)} className="form-control input-lg">

																		{this.state.eventArray && this.state.eventArray.map((item, i) => {
																			return <option key={i} value={item.eventTypeId}>{item.eventName}</option>
																		})}
																	</Field>
																</Col>
															</FormGroup>
															<FormGroup as={Row} controlId="formHorizontalEmail">
																<Col componentClass={ControlLabel} sm={2}>

																	<div style={{ whiteSpace: 'no-wrap', marginLeft: '-55px' }}>SubEvent Type:</div>
																</Col>
																<Col sm={10}>
																	{/* {this.state.eventArray && this.state.eventArray.map((value, index) => <option key={index} value={value.eventTypeId} >{value.eventName}</option>)} */}
																	<Field component="select" name="sunevve" onChange={(event) => this.subEventTypeChange(event)} className="form-control input-lg">
																		{this.state.subEventArray && this.state.subEventArray.map((value, i) => {
																			return <option key={i} value={value.subEventId}>{value.subEventName}</option>
																		})}
																	</Field>
																</Col>
															</FormGroup>

															<FormGroup as={Row} controlId="formHorizontalEmail">
																<Col componentClass={ControlLabel} sm={2}>
																	<div>PinCode:</div>
																</Col>
																<Col sm={10}><Field type="text" value={this.state.pinCode} name="PinCode" className="form-control" placeholder={'Pincode'} onChange={(event) => this.onPincodeChange(event)} />
																	{errors.pinCode && touched.pinCode ? (<div className="error-message">{errors.pinCode}</div>) : null}
																</Col>
															</FormGroup>

															<Button bsStyle="success" type="submit" disabled={this.state.subEventArray.length == 0 ? true : false}
																className='btn btn-success' style={{ marginLeft: '165px', borderRadius: '10px' }} >{'proceed to order'}</Button>


															<div>
																{/* <Button className="btn call-btn  bg-primary" href={helper.generateLinkedUrl('')} label={'linkedin_signin.signin_with_linkedin'} iconType="fa-linkedin" buttonClass={'buttonBig buttonGray full-width'} /> */}
															</div>
														</div>
													</div>
												</section>
											</div>
										</div>
									</Form>
								</Col>
							</Row>						</div>
					)}
				/>

			</div>
		);
	}
}


const mapStateToProps = (state) => ({
	candidate: state.candidate
});

export default connect(mapStateToProps)(HomePage);

