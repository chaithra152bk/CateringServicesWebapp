import * as React from 'react';
// import { Container} from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Form, FormGroup, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import history from './history';


// import 'bootstrap/dist/css/bootstrap.css';

// const indoptions = [
//   { value: 'birthday', label: 'birthday' },
//   { value: 'marriage', label: 'marriage' },
//   { value: 'housewarming', label: 'House Warming' }
// ];

// const orgoptions = [
//   { value: 'foodpack', label: 'Food Pack' },
//   { value: 'Annual Events', label: 'Annual Events' }
// ];

// var options = [];
// options = indoptions;

class CutomForm1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: null,
            eventArray: []

        };
        this.indoptions = [
            { value: 'birthday', label: 'birthday' },
            { value: 'marriage', label: 'marriage' },
            { value: 'housewarming', label: 'House Warming' }
        ],
            this.orgoptions = [
                { value: 'foodpack', label: 'Food Pack' },
                { value: 'Annual Events', label: 'Annual Events' }
            ];

    }

    componentDidUpdate() {
        // this.handleChange();
    }

    handleOptionChange = (event) => {
        //  alert('ahahaha');
        // this.setState({ eventArray: indoptions })

    }

    handleChange = (value) => {
        // alert("event");
        console.log('handle change called', value);
        if (value == 1) {
            this.setState({ eventArray: this.indoptions })
        } else {
            this.setState({ eventArray: this.orgoptions })
        }
    }
    render() {
        const params = { data: { fname: 'john', lname: 'doe' } };

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
                                    <FormControl name="clientname" placeholder="Client Name" type="text" />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Email:
    </Col>
                                <Col sm={10}>
                                    <FormControl name="clientemail" placeholder="asd@gmail.com" />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Phone:
    </Col>
                                <Col sm={10}>
                                    <FormControl name="clientphone" placeholder="Client Phone Number" />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} md={2}  >
                                    <span className="oldlabelContainer">Event Address1:</span></Col>
                                <Col md={10}>
                                    <FormControl as="textarea" name="clientlocation" placeholder="LocationName, street, Area" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    <span className="oldlabelContainer">Event Date:</span>
                                </Col>
                                <Col sm="10">
                                    <FormControl type="date" name="clientdate" placeholder="Event Date" />                </Col>
                            </FormGroup>    
                            <FormGroup controlId="formHorizontalEmail" style={{ marginTop: '-10px', marginBottom: '1px' }}>
                                <Col componentClass={ControlLabel} md={4} style={{ marginLeft: '-27px' }}>
                                    <span style={{ paddingRight: '80px' }}>User Type: </span>
                                </Col>
                                <Col md={4}>
                                    <FormGroup controlId="formGridEmail">
                                        <span style={{ color: 'gray', fontWeight: 'bold' }}>
                                            <input type="radio" name="site_name" style={{ marginLeft: '-45px', marginTop: 10 }}
                                                onChange={(e) => { this.handleChange(1) }}
                                            />    Individual</span>

                                    </FormGroup>
                                </Col>

                                <Col md={4}>
                                    <FormGroup controlId="formGridEmail">
                                        <span style={{ color: 'gray', fontWeight: 'bold' }}>  <input type="radio" name="site_name" style={{ marginLeft: '-80px', marginTop: 10, color: 'black', fontWeight: 'bold' }}

                                            onChange={(e) => { this.handleChange(2) }}
                                        />   Organization</span>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup as={Row} controlId="formControlsSelect">
                                <Col componentClass={ControlLabel} sm={2}>
                                    <span style={{ whiteSpace: 'nowrap', marginLeft: '-50px' }}>Event Type:</span>
                                </Col>

                                <Col sm="10">



                                    <FormControl componentClass="select" placeholder="select">
                                        {this.state.eventArray.map(({ value, label }, index) => <option value={value} >{label}</option>)}
                                    </FormControl>

                                </Col>
                            </FormGroup>


                            <FormGroup as={Row} controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                <span style={{ whiteSpace: 'nowrap', marginLeft: '-50px' }}>SubEvent Type:</span>
              </Col>
                                <Col sm="10">
                                <FormControl componentClass="select" placeholder="select">
                                        {this.state.eventArray.map(({ value, label }, index) => <option value={value} >{label}</option>)}
                                    </FormControl>

                                </Col>
                            </FormGroup>

                            <FormGroup as={Row} controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Pincode:
              </Col>
                                <Col sm="10">
                                    <FormControl name="clientpincode" placeholder="Client PinCode" />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Button bsStyle="success" type="submit" className='btn btn-success'
                                    style={{ marginLeft: '165px', borderRadius: '10px' }}
                                    onClick={() => history.push('/orders',{            userName : this.userName
                                    }
                                    )}>
                                    Proceed to Place Order
        </Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default CutomForm1;