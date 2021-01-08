import * as React from 'react';
import DishesData from '../../data/Dishes.json';
import EventData from '../../data/EventDetails.json';
import '.././layout/SidebarMenu.css';
import DatePicker from "react-datepicker";
import CommonModal from "../common/modal/Modal";


import "react-datepicker/dist/react-datepicker.css";

class OrderPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            data: this.props.EventData.events,
            eventType: '',
            eventId: null,
            DishesName: '',
            DishId: null,
            tabs: this.props.EventData.events,
            activeColor: false,
            startDate: new Date()


        }

        this.modalRef = null;
        this.confirmRef = null;
        this.handleTabClick = this.handleTabClick.bind(this);
        this.updateTabs = this.updateTabs.bind(this);
        this.orderList = [];
    }
    handleChange = (date) => {
        console.log("date---", date)
        this.setState({
            startDate: date
        });
    }

    onchangeEvent = (id, name) => {
        console.log("ventname", id, name)
        this.setState({ eventId: id })
        this.setState({ DishesName: name })
    }
    updateTabs(id) {
        let tabs = this.state.tabs;
        let newtabs = tabs.map((tab, index) => {
            if (tab.eventId == id) {
                if (tab.active == true) {
                    tab.active = false
                } else {
                    tab.active = true;
                }
            } else {
                tab.active = false;
            }
            return tab;
        });
        return newtabs;
    }

    handleTabClick(eventId) {
        console.log("eventId", eventId)
        this.setState({ tabs: this.updateTabs(eventId) });
    }
    cardChangeEvent = async (value) => {
        console.log("card", value.active)
        this.setState({ DishId: await value.foodId })

        if (value.foodId == this.state.DishId) {
            console.log("id---------", this.state.DishId)
            if (value.active == true) {
                this.orderList.pop(value)
                value.active = false
                console.log("frst", value.active)
            } else {
                this.orderList.push(value)
                value.active = true;
                console.log("else", value.active)
            }
        } else {

            value.active = false;
            console.log("no ", value.active)
        }

        this.setState({ activeColor: !this.state.activeColor })

    }

    orderSubmit = () => {


        console.log("modalllllllllllllll", this.orderList)

        this.modalRef.props.onHide({
            body: this.orderDetailPopup(),
            header: ''
        })

    }

    confirmOrderChange = () => {
        this.confirmRef.props.onHide({
            body: <section style={{ margin: 5 }}>
                <div className="jobDetail-container-popupView">
                    <div className="row" style={{ alignItems: 'center', margin: '10px' }}>
                        <div className="col-md-12">
                            <h4>Order Confirmed</h4>
                        </div>
                    </div>
                </div>
            </section>,
            header: ''
        })
    }

    resetOrderChange = () => {
        if (this.orderList.length > -1) {
            this.orderList = []
            // this.modalRef.props.onHide();
        }

    }
    orderDetailPopup = () => {
        let Quantity = 12
        let sum = this.orderList.map(o => o.Price).reduce((a, c) => { return a + c });

        return (
            <div style={{ margin: "20px" }}>
                <div className="jobDetail-container-popupView">
                    <div className="row" style={{ backgroundColor: 'lightgray', padding: '20px', marginBottom: 20, marginTop: 10, marginRight: '-19px', marginLeft: '-19px' }}>
                        <div className="col-md-offset-4 col-md-8 col-xs-12" >
                            <div style={{ fontSize: '25px', fontWeight: 'bold', color: 'black' }}>Order Details</div>
                        </div>
                    </div>
                    <div>
                        <div className="row" style={{ marginLeft: '5px', marginRight: '5px' }}>
                            <div className="col-md-5 col-sm-6 col-xs-12">
                                <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>Date: 12/05/2021</div>
                            </div>
                            <div className="col-md-7 col-sm-6 col-xs-12">
                                <div style={{ float: 'right', marginRight: '60px', fontSize: '16px', fontWeight: 'bold', color: 'black' }}>No. of Persons:  {Quantity}</div>
                            </div>

                            <hr style={{ border: "0.5px solid black", marginBottom: 2, marginTop: 2 }} />
                            <div className="col-md-5 col-sm-6 col-xs-12" >
                                <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>Location: Bangalore</div>
                            </div>
                            <div className="col-md-7 col-sm-6 col-xs-12" >
                                <div style={{ float: 'right', fontSize: '16px', fontWeight: 'bold', color: 'black' }}>Contact No.: 9606345827</div>
                            </div>

                            <hr style={{ border: "0.5px solid black", marginBottom: 2, marginTop: 2 }} />

                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6" >
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'black' }}>Items</div>

                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6" >
                            <div style={{ float: 'right', marginRight: '20px', fontSize: '18px', fontWeight: 'bold', color: 'black' }}>Price</div>

                        </div>
                        <hr style={{ border: "0.5px solid black", marginBottom: 2, marginTop: 2 }} />
                        <div style={{ height: "220px", overflowY: 'auto' }}>
                            {this.orderList.map((value, j) => {
                                return (
                                    <div >
                                        <div key={j} className="row" style={{ marginLeft: '5px', marginRight: '5px' }}>
                                            <div className="col-md-6 col-sm-6 col-xs-6">
                                                <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'black' }}>{value.name}</div>
                                            </div>
                                            <div className="col-md-6 col-sm-6 col-xs-6" >
                                                <div style={{ float: 'right', fontSize: '15px', fontWeight: 'bold', color: 'black' }}> {'Rs. '}{value.Price}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <hr style={{ border: "0.5px solid black", marginBottom: 2, marginTop: 2 }} />
                        <div className="row" style={{ marginRight: '5px' }}>
                            <div className="col-md-6 col-sm-6 col-xs-6" >
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-6" >
                                <div style={{ float: 'right', fontSize: '16px', fontWeight: 'bold', color: 'black' }}> Total: {'Rs. '}{sum * Quantity} </div>
                            </div>
                        </div>
                        <hr style={{ border: "0.5px solid black", marginBottom: 2, marginTop: 2 }} />
                        <div className="row" style={{ marginLeft: '15px', marginBottom: '5px', marginTop: "25px" }}>
                            <div className="col-md-6 col-xs-12">
                                <button className="resetButton" onClick={() => this.resetOrderChange()}>Reset order</button>
                            </div>
                            <div className="col-md-6 col-xs-12" >
                                <button className="submitButton" onClick={() => this.confirmOrderChange()}>Confirm order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        const tabarray = this.state.tabs
        return (

            <div>
                <div id="sidebar" className="sidebar">
                    <div className="sidebarwrap">
                        <div className="list-group panel">

                            <div>
                                <h4 className="list-group-item list-group-item-success" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>Event Types</h4>
                                {
                                    tabarray.map((tab, index) => {
                                        return (

                                            <div className="tab" key={index}>
                                                <div className="list-group-item list-group-item-success" onClick={() => {
                                                    this.handleTabClick(tab.eventId)
                                                }}>
                                                    <span style={{ paddingRight: '30px', fontSize: '18px', fontWeight: 'bold' }}>{tab.eventname}</span>
                                                    <i className={tab.active ? "fa fa-chevron-up" : "fa fa-chevron-down"} style={{ float: 'right' }}></i>
                                                </div>
                                                {tab.dishes.map((item, i) => {
                                                    return (<div key={i} className={tab.active ? "content show" : "content hide"}>

                                                        <div className="submenuContainer"
                                                            onClick={() => this.onchangeEvent(tab.eventId, item)}>  {item}


                                                        </div>

                                                    </div>)
                                                })}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>




                    </div>
                </div>
                {this.state.DishesName != '' && this.state.eventId != null ?
                    <section style={{ height: '50px' }}>
                        <div className="row">
                            <div className="col-md-offset-2 col-md-2 col-sm-12">
                                <div>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Location: Bangalore</span>
                                </div>
                            </div>
                            <div className=" col-md-4 col-sm-12">
                                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Event Date:  <DatePicker
                                    value={this.state.startDate}
                                    selected={this.state.startDate}
                                    onChange={(date) => this.handleChange(date)}


                                /></span>


                            </div>
                            <div>
                            </div>


                        </div>
                    </section> : null}
                <section className="full-detail" style={{ height: '530px', overflowY: 'auto' }}>
                    {this.state.DishesName != '' && this.state.eventId != null ?
                        <div>

                            {/* <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <div className="container">
                                        <div className="row"> */}

                            {this.state.DishesName == "Vegiterian" ? this.props.DishesData.map((item) => {
                                return (
                                    this.state.eventId === item.eventId ? item.veg.map(value => {
                                        return (

                                            <div className='col-md-3 col-sm-12' >
                                                <div className="paid-candidate-container mrg-10 random" onClick={() => this.cardChangeEvent(value)}>
                                                    {value.active == false ? null : <i className="fa fa-check" style={{ float: 'right', fontSize: 22, color: 'blue', backgroundColor: 'aliceblue', padding: '5px' }}></i>}
                                                    <div className="paid-candidate-box-random">
                                                        <div className="newstyle">
                                                            <div className="paid-candidate-box-thumb">
                                                                <img src={require(`../../assets/images/Foods/${value.imgUrl}`)} className="random-img" alt="" />
                                                            </div>
                                                            <div className="paid-candidate-box-detail">
                                                                <h4>{value.name}</h4>
                                                                <span className="desination"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="btn btn-paid-candidate bt-1" >&#8377;  {value.Price}</p>
                                                </div>
                                            </div>


                                        )
                                    }) : null
                                )
                            }
                            )
                                : null}
                            {/* </div>
                                    </div>
                                </div>
                            </div> */}


                            {this.state.DishesName == "Non-Veg" ? this.props.DishesData.map((item) => {
                                return (

                                    this.state.eventId === item.eventId ? item.nonveg.map(value => {

                                        return (
                                            <div className='col-md-3 col-sm-6'>
                                                <div className="paid-candidate-container mrg-10 random" onClick={() => this.cardChangeEvent(value)}>
                                                    {value.active == false ? null : <span><i className="fa fa-check" style={{ float: 'right', fontSize: 22, color: 'blue', backgroundColor: 'aliceblue', padding: '5px' }}></i></span>}
                                                    <div className="paid-candidate-box-random">
                                                        <div className="newstyle">
                                                            <div className="paid-candidate-box-thumb">
                                                                <img src={require(`../../assets/images/Foods/${value.imgUrl}`)} className="random-img" alt="" />
                                                            </div>
                                                            <div className="paid-candidate-box-detail">
                                                                <h4>{value.name}</h4>
                                                                <span className="desination"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <a className="btn btn-paid-candidate bt-1" >&#8377;  {value.Price}</a>
                                                </div>
                                            </div>
                                        )
                                    }) : null
                                )
                            }
                            )
                                : null}
                            {this.state.DishesName == "dessert" ? this.props.DishesData.map((item) => {
                                return (

                                    this.state.eventId === item.eventId ? item.dessert.map(value => {

                                        return (
                                            <div className='col-md-3 col-sm-6'>
                                                <div className="paid-candidate-container mrg-10 random" onClick={() => this.cardChangeEvent(value)}>
                                                    {value.active == false ? null : <i className="fa fa-check" style={{ float: 'right', fontSize: 22, color: 'blue', backgroundColor: 'aliceblue', padding: '5px' }}></i>}
                                                    <div className="paid-candidate-box-random">
                                                        <div className="newstyle">
                                                            <div className="paid-candidate-box-thumb">
                                                                <img src={require(`../../assets/images/Foods/${value.imgUrl}`)} className="random-img" alt="" />
                                                            </div>
                                                            <div className="paid-candidate-box-detail">
                                                                <h4>{value.name}</h4>
                                                                <span className="desination"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <a className="btn btn-paid-candidate bt-1" >&#8377;  {value.Price}</a>
                                                </div>
                                            </div>
                                        )
                                    }) : null
                                )
                            }
                            )
                                : null}
                        </div> : <div className="full-detail">
                            <div className="background">
                                <p className="bg-text">Select Event type</p>

                            </div>
                        </div>

                    }

                </section>
                <div style={{ height: 20, marginBottom: 10 }}>


                    {this.state.eventId != null || this.state.DishesName != '' ?
                        <div className='row' style={{ flex: 1, flexDirection: 'row', marginRight: 10, alignItems: 'center', marginTop: 10 }}>
                            <div className="col-md-offset-10 col-md-2 ">
                                <button className='submitButton' disabled={this.orderList.length > 0 ? false : true} type='submit' onClick={() => this.orderSubmit()}>Order It!</button>
                            </div>
                        </div>
                        : null}
                </div>
                <CommonModal ref={(ref) => this.modalRef = ref} />
                <CommonModal ref={(ref) => this.confirmRef = ref} />
            </div >


        );
    }
}


export default OrderPage;
