import * as React from 'react';
// import { Container} from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Form, FormGroup, FormControl, ControlLabel, Checkbox, HelpBlock } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import eventData from '../../data/Dishes.json';
import { NavLink } from 'react-router-dom';
import DatePicker from "react-datepicker";



class CutomForm1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: null,
            eventArray: [],
            subEventArray: [],
            userName: '',
            email: '',
            contactNumber: null,
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
        this.setInputFocus = this.setInputFocus.bind(this);
    }

    componentDidUpdate() {
        // this.getValidationState()
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
    }

    onContactNumberChange = async (event) => {
        this.setState({ contactNumber: await event.target.value })
    }

    onEventAddressChange = (event) => {
        this.setState({ eventAddress: event.target.value })
    }

    onEventDateChange = async(date) => {
        if(date > new Date()){
            this.setState({ eventDate: await date })

        }
        else{
            alert('anajjjjjjjjj')
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
        }

        this.setState({ userType: value })
    }

    getValidationState = () => {


    }

    setInputFocus() {
        this.myInputRef.focus();
    }


    render() {
        const params = { data: { fname: 'john', lname: 'doe' } };
        let userName = 'chaithra'

        return (
            <div style={{ marginTop: 60 }}>
                <Row xs={1} md={1}>
                    <Col md={7} sm={0}>
                        <img src={require(`../../assets/images/buffet.jpg`)} style={{ width: '100%', height: '50%' }} alt="" />
                    </Col>
                    <Col md={5} sm={12} style={{ marginLeft: '0px', marginRight: '0px', marginTop: '15px' }}>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Name:
    </Col>
                                <Col sm={10}>
                                    <FormControl 
                                        required={true} name="clientname" placeholder="Client Name" type="text" onChange={(event) => this.onUserNameChange(event)}

                                    />
                                </Col>
                                {this.state.errormsg ? <div style={{ color: 'red', fontSize: 15, marginLeft: '115px' }}>{this.state.errormsg}</div> : null}
                            </FormGroup>

                            
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Email:
    </Col>
                                <Col sm={10}>
                                    <FormControl name="clientemail" required={true} placeholder="asd@gmail.com" type="email" onChange={(event) => this.onEmailChange(event)} />
                                </Col>
                                {this.error ? <div style={{ color: 'red', fontSize: 15, marginLeft: '115px' }}>{this.error}</div> : null}

                            </FormGroup>
                            <FormGroup controlId="formHorizontalPhone"  >
                                <Col componentClass={ControlLabel} sm={2}>
                                    Phone:
    </Col>
                                <Col sm={10}>
                                    <input maxLength={10} type="number" name="clientphone" placeholder="Client Phone Number"
                                        onChange={(event) => this.onContactNumberChange(event)} />
                                </Col>
                                {this.state.errorHelp ? <div style={{ color: 'red', fontSize: 15, marginLeft: '115px' }}>{this.state.errorHelp}</div> : null}

                            </FormGroup>


                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} md={2}  >
                                    <span className="oldlabelContainer">Event Address:</span></Col>
                                <Col md={10}>
                                    <FormControl as="textarea" name="clientlocation" placeholder="LocationName, street, Area" type="text" onChange={(event) => this.onEventAddressChange(event)} />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    <span className="oldlabelContainer">Event Date:</span>
                                </Col>
                                <Col sm="10">
                                    <DatePicker
                                        style={{ width: "250%" }}
                                        className="form-control"
                                        value={this.state.eventDate}
                                        selected={this.state.eventDate}
                                        onChange={(date) => this.onEventDateChange(date)}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={12}
                                        dateFormat="dd/MM/yyyy  HH:mm a"
                                    />
                                </Col>  </FormGroup>
                            <FormGroup controlId="formHorizontalEmail" style={{ marginTop: '-10px', marginBottom: '1px' }}>
                                <Col componentClass={ControlLabel} md={4} style={{ marginLeft: '-27px' }}>
                                    <span style={{ paddingRight: '80px' }}>User Type: </span>
                                </Col>
                                <Col md={4}>
                                    <FormGroup controlId="formGridEmail">
                                        <span style={{ color: 'gray', fontWeight: 'bold' }}>
                                            <input type="radio" name="site_name" style={{ marginLeft: '-45px', marginTop: 10 }}
                                                onChange={(e) => this.handleChange(1)}
                                            />    Individual</span>

                                    </FormGroup>
                                </Col>

                                <Col md={4}>
                                    <FormGroup controlId="formGridEmail">
                                        <span style={{ color: 'gray', fontWeight: 'bold' }}>  <input type="radio" name="site_name" style={{ marginLeft: '-80px', marginTop: 10, color: 'black', fontWeight: 'bold' }}

                                            onChange={(e) => this.handleChange(2)}
                                        />   Organization</span>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup as={Row} controlId="formControlsSelect">
                                <Col componentClass={ControlLabel} sm={2}>
                                    <span style={{ whiteSpace: 'nowrap', marginLeft: '-50px' }}>Event Type:</span>
                                </Col>

                                <Col sm="10">



                                    <FormControl componentClass="select" placeholder="select" onChange={(event) => this.eventTypeChange(event)}>
                                        {this.state.eventArray && this.state.eventArray.map((value, index) => <option key={index} value={value.eventTypeId} >{value.eventName}</option>)}
                                    </FormControl>

                                </Col>
                            </FormGroup>


                            <FormGroup as={Row} controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    <div style={{ whiteSpace: 'nowrap', marginLeft: '-35px' }}>SubEvent Type:</div>
                                </Col>
                                <Col sm="10">
                                    <FormControl componentClass="select" placeholder="select" onChange={(event) => this.subEventTypeChange(event)}>
                                        {this.state.subEventArray && this.state.subEventArray.map((subevents, i) => <option key={i} value={subevents.subEventId} >{subevents.subEventName}</option>)}
                                    </FormControl>

                                </Col>
                            </FormGroup>

                            <FormGroup as={Row} controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Pincode:
              </Col>
                                <Col sm="10">
                                    <FormControl name="clientpincode" placeholder="Client PinCode" type="number" onChange={(event) => this.onPincodeChange(event)} />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Button bsStyle="success" type="submit" className='btn btn-success' style={{ marginLeft: '165px', borderRadius: '10px' }}
                                disabled={this.state.userName === '' ? true: false}
                                onClick={() => this.props.history.push({
                                    pathname: '/orders',
                                    state: {
                                        userName: this.state.userName, contactNumber: this.state.contactNumber, email: this.state.email,
                                        eventAddress: this.state.eventAddress, eventDate: this.state.eventDate, userType: this.state.userType,
                                        eventType: this.state.eventType, eventName: this.state.eventName, subEventTypeId: this.state.subEventType,
                                        subEventName: this.state.subEventName, pinCode: this.state.pinCode
                                    }
                                  } )}>
                                    proceed to order
                                </Button>
                                {/* <NavLink bsStyle="success" type="submit" className='btn btn-success'
                                    style={{ marginLeft: '165px', borderRadius: '10px' }}
                                    to={{
                                        pathname: '/orders', state: {
                                            userName: this.state.userName, contactNumber: this.state.contactNumber, email: this.state.email,
                                            eventAddress: this.state.eventAddress, eventDate: this.state.eventDate, userType: this.state.userType,
                                            eventType: this.state.eventType, eventName: this.state.eventName, subEventTypeId: this.state.subEventType,
                                            subEventName: this.state.subEventName, pinCode: this.state.pinCode
                                        }
                                    }}
                                >
                                    Proceed to Place Order
        </NavLink> */}
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                {/* <footer className="footer fixed-bottom">
			
			<div className="row copyright">
				<div className="container">

                    Lakshya hospitality
				</div>
			</div>
		</footer> */}

            </div >

        );
    }
}

export default CutomForm1;