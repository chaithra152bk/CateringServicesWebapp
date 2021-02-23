import * as React from 'react';
// import { Container} from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Form, FormGroup, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import eventData from '../../data/Dishes.json';
import { NavLink } from 'react-router-dom';



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
            subEventName: "Wedding" || ''
        };
        this.eventFilterArray = eventData.eventType[0]
        this.indoptions = eventData.eventType
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

    onUserNameChange = (event) => {
        this.setState({ userName: event.target.value })
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onContactNumberChange = (event) => {
        this.setState({ contactNumber: event.target.value })
    }

    onEventAddressChange = (event) => {
        this.setState({ eventAddress: event.target.value })
    }

    onEventDateChange = (event) => {
        this.setState({ eventDate: event.target.value })
    }

    onPincodeChange = (event) => {
        this.setState({ pinCode: event.target.value })
    }

    handleChange = async (value) => {
        console.log("ajajaja", value)
        if (value === 1) {
            this.setState({ eventArray: await eventData.eventType })
        } else {
            this.setState({ eventArray: [] })
        }

        this.setState({ userType: value })
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
                                    <FormControl name="clientname" placeholder="Client Name" type="text" onChange={(event) => this.onUserNameChange(event)}

                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Email:
    </Col>
                                <Col sm={10}>
                                    <FormControl name="clientemail" placeholder="asd@gmail.com" type="email" onChange={(event) => this.onEmailChange(event)} />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Phone:
    </Col>
                                <Col sm={10}>
                                    <FormControl name="clientphone" placeholder="Client Phone Number" type='number' onChange={(event) => this.onContactNumberChange(event)} />
                                </Col>
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
                                    <FormControl type="date" name="clientdate" placeholder="Event Date" type="date" onChange={(event) => this.onEventDateChange(event)} />                </Col>
                            </FormGroup>
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

                                            onChange={(e) => this.handleChange(2) }
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
                                    <span style={{ whiteSpace: 'nowrap', marginLeft: '-50px' }}>SubEvent Type:</span>
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
                                <NavLink bsStyle="success" type="submit" className='btn btn-success'
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
        </NavLink>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </div >

        );
    }
}

export default CutomForm1;