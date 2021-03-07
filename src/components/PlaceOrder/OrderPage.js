import * as React from 'react';
import DishesData from '../../data/Dishes.json';
import EventData from '../../data/EventDetails.json';
import '.././layout/SidebarMenu.css';
import DatePicker from "react-datepicker";
import CommonModal from "../common/modal/Modal";
import "react-datepicker/dist/react-datepicker.css";
import Notification from '../common/notification/Notification';
import constant from '../../shared/constant';
import * as moment from "moment";
import { Form, FormGroup, FormControl, ControlLabel, Checkbox, HelpBlock } from 'react-bootstrap';


const toast = new Notification()

class OrderPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientName: this.props.history.location.state.userName || '',
            error: null,
            isLoaded: false,
            items: [],
            data: this.props.EventData.events,
            eventType: '',
            eventId: null,
            subFoodCategoryName: '',
            DishId: null,
            tabs: this.props.DishesData.eventType[1],
            activeColor: false,
            startDate: this.props.history.location.state.eventDate || new Date(),
            eventActive: false,
            subFoodCategoryId: null,
            foodCategoryId: null,
            subTabs: [],
            activeIndex: null,
            activeCategory: null,
            selectActive: false,
            foodIndex: null,
            eventStatus: false,
            categoryStatus: false,
            tickStatus: false,
            dishName: '',
            quantity: null,
            totalPrice: 1
        }

        console.log("ajjjjjjjjjjjjjjj", this.props.history.location.state)
        this.modalRef = null;
        this.confirmRef = null;
        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleCategoryClick = this.handleCategoryClick.bind(this);
        this.orderSubmit = this.orderSubmit.bind(this)
        this.orderList = [];
        this.eventName=""
    }

    handleChange = (date) => {
        this.setState({
            startDate: date
        });
    }

    onchangeEvent = async (id, name, index) => {
        let eventId = 7;
        this.setState({ eventId: await eventId })
        this.setState({ subFoodCategoryName: await name.subFoodCategoryName })
        this.setState({ subFoodCategoryId: await name.subFoodCategoryId })
        this.setState({ foodCategoryId: await id })
        this.setState({ navColor: true })
        this.setState({ foodIndex: index })
        let dishesList = name.dishes
        if (dishesList.length > 0) {
            console.log("")
        } else {
            toast.show("No dishes for selected category, please contact administrator: test@test.com",
                constant.error
            );
        }
    }

    componentDidUpdate() {
        // this.onchangeQuantity()
    }

    handleTabClick(tab, index) {
        let newtab = tab.foodSubCategories
        this.setState({ activeIndex: index })
        if (this.state.eventStatus == true && this.state.activeIndex == index) {
            this.setState({ eventStatus: false })
        } else {
            this.setState({ eventStatus: true })
        }

        if (newtab.length > 0) {
            console.log("");
        }
        else {
            toast.show("No food category available,please contact administator: test@test.com",
                constant.error
            );
        }



    }

    handleCategoryClick(category, newIndex) {
        let food = category.foodSubCategories
        this.setState({ activeCategory: newIndex })
        // this.setState({ categoryStatus: !this.state.categoryStatus })
        if (this.state.categoryStatus == true && this.state.activeCategory == newIndex) {
            this.setState({ categoryStatus: false })
        } else {
            this.setState({ categoryStatus: true })
        }

        if (food.length > 0) {
            console.log("");
        }
        else {
            toast.show("No food category available,please contact administator: test@test.com",
                constant.error
            );
        }

    }

    cardChangeEvent = async (value, foodCategoryId, subFoodCategoryId, foodCategoryName, subFoodCategoryName) => {
        this.setState({ DishId: await value.dishId })
        this.setState({ dishName: await value.dishName })
        if (value.dishId == this.state.DishId && this.state.foodCategoryId == foodCategoryId && this.state.subFoodCategoryId == subFoodCategoryId) {
            value['foodCategoryName'] = foodCategoryName;
            value['subFoodCategoryName'] = subFoodCategoryName;
            value['foodCategoryId'] = foodCategoryId;
            value['subFoodCategoryId'] = subFoodCategoryId;
            let index = this.orderList.findIndex(x => x.dishId == value.dishId)
            if (this.orderList.findIndex(x => x.dishId == value.dishId) == -1) {
                this.orderList.push(await value)
                this.setState({ selectActive: true })
            } else {
                this.orderList.splice(index, 1)
                this.setState({ selectActive: false })
            }
        }
        else {
            this.setState({ selectActive: true })
        }
    }

    orderSubmit = () => {
        this.modalRef.props.onHide({
            body: this.orderDetailPopup(),
            header: ''
        })
    }

    confirmOrderChange = () => {
        this.modalRef.props.onHide(false);
        let orderDetails = {};
        orderDetails['eventDate'] = this.state.startDate;
        orderDetails['eventLocation'] = this.props.history.location.state.eventAddress;
        orderDetails['pinCode'] = this.props.history.location.state.pinCode;
        orderDetails['name'] = this.props.history.location.state.userName;
        orderDetails['eventType'] = this.props.history.location.state.eventName;
        orderDetails['subEventType'] = this.props.history.location.state.subEventName;
        orderDetails['items'] = this.orderList;
        orderDetails['numberOfPeople'] = this.state.quantity;
        orderDetails['totalPrice'] = this.state.totalPrice;
        orderDetails['mobileNumber'] = this.props.history.location.state.contactNumber;
        orderDetails['emailId'] = this.props.history.location.state.email;
        orderDetails['address'] = this.props.history.location.state.eventAddress;
        toast.show("Order Confirmed",
            constant.success
        );
    }

    resetOrderChange = () => {
        if (this.orderList.length > -1) {
            this.orderList = []
            this.modalRef.props.onHide();
            window.location.reload()
            toast.show("Order  was reset",
                constant.error
            );

        }

    }

    onchangeQuantity = async (event) => {

        this.setState({ quantity: await event.target.value })
        let sum = this.orderList.map(o => o.price).reduce((a, c) => { return a + c });

        let newValue = sum * this.state.quantity

        this.setState({ totalPrice: await newValue })
        console.log("sum * this.state.quantity", sum * this.state.totalPrice)


        // this.orderDetailPopup()
        // console.log("this.price", this.state.totalPrice)
        // this.orderSubmit()
        this.modalRef.props.onHide({
            body: this.orderDetailPopup(),
            header: ''
        })

        // this.orderDetailPopup(this.state.totalPrice)
    }



    orderDetailPopup = () => {

        return (
            <div style={{ margin: "20px" }}>
                <div className="jobDetail-container-popupView">
                    <div className="row" style={{ backgroundColor: '#35434e', padding: '22px', marginBottom: 20, marginTop: 10, marginRight: '-20px', marginLeft: '-20px' }}>
                        <div className="col-md-offset-4 col-md-8 col-xs-12" >
                            <div className="orderHeader">Order Details</div>

                        </div>

                    </div>
                    <button className="close" onClick={() => this.modalRef.props.onHide()
                    }><i className="fa fa-close"></i></button>
                    <div>

                        <div className="row" style={{ marginLeft: '5px', marginRight: '5px' }}>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="orderLeftText">Date: {moment(this.state.startDate).format("D/M/YYYY hh:mm")}</div>
                            </div>

                            <hr />
                        </div>
                        <div className="row" style={{ marginLeft: '5px', marginRight: '5px' }}>
                            < div className="col-md-6 col-sm-12 col-xs-12">
                                <div className="orderLeftText">
                                    No.of Persons:

                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <input name="quantity" placeholder="Enter Number" style={{ marginLeft: '23px', marginBottom: '5px',
                                 border: "1px solid black", color:'black', fontWeight:'bold' }}
                                    type="number" value={this.state.quantity}
                                    onChange={(event) => this.onchangeQuantity(event)} />
                            </div>
                            <hr />
                        </div>

                        <div className="row" style={{ marginLeft: '5px', marginRight: '5px' }}>

                            <div className="col-md-6 col-sm-12 col-xs-12" >
                                <div className="orderLeftText">Location: Bangalore</div>
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12" >
                                <div className="contactText">Contact No: {this.props.history.location.state.contactNumber}</div>
                            </div>

                            <hr />

                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6" >
                            <div className="itemText">Items</div>

                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6" >
                            <div className="priceText">Price</div>

                        </div>
                        <hr />
                        <div className="placeOrderTable">
                            {this.orderList.map((value, j) => {
                                return (
                                    <div >
                                        <div key={j} className="row" style={{ marginLeft: '5px', marginRight: '5px' }}>
                                            <div className="col-md-6 col-sm-6 col-xs-6">
                                                <div className="orderTableLeftText">{value.dishName}</div>
                                            </div>
                                            <div className="col-md-6 col-sm-6 col-xs-6" >
                                                <div className="orderTableRightText"> <span>
                                                    {'Rs. '} </span>{value.price} </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <hr />
                        <div className="row" style={{ marginRight: '5px' }}>
                            <div className="col-md-6 col-sm-6 col-xs-6" >
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-6" >
                                <div className="contactText"> Total: {this.state.totalPrice} </div>

                            </div>
                        </div>

                        <hr />

                        <div className="row" style={{ marginLeft: '15px', marginBottom: '5px', marginTop: "25px" }}>
                            <div className="col-md-6 col-xs-12">
                                <button className="btn btn-danger" onClick={() => this.resetOrderChange()}>Reset order</button>
                            </div>
                            <div className="col-md-6 col-xs-12" >
                                <button className="btn btn-success" onClick={() => this.confirmOrderChange()}>Confirm order</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }


    render() {

        let eve = this.props.DishesData.eventType
        let eventId = this.props.history.location.state.eventType
        let subEvent = this.props.history.location.state.subEventTypeId
        let index = eve.findIndex((x) => x.eventTypeId == eventId)
        let tabarray = this.props.DishesData.eventType[index];
        let subEventIndex = tabarray.subEventTypes.findIndex((y) => y.subEventId == subEvent)
        let eventName = tabarray.subEventTypes[subEventIndex].subEventName
        this.eventName= eventName
        let eventArray = tabarray.subEventTypes[subEventIndex].foodCategories;

        return (

            <div>
                <div id="sidebar" className="sidebar">
                    <div className="sidebarwrap">
                        <div className="list-group panel">

                            <div>
                                <h4 className="list-group-item list-group-item-success" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>Food Categories</h4>
                                {
                                    eventArray && eventArray.map((tab, index) => {
                                        // console.log("tab------", tab)
                                        return (

                                            <div className="tab" key={index}>
                                                <div className="list-group-item list-group-item-success" style={{ cursor: 'pointer' }} onClick={() => {
                                                    this.handleTabClick(tab, index)
                                                }}>
                                                    <span style={{ fontSize: '18px', textTransform: 'capitalize', fontWeight: 'bold' }}>{tab.foodCategoryName}</span>
                                                    <i className={this.state.activeIndex === index && this.state.eventStatus ? "fa fa-chevron-up" : "fa fa-chevron-down"} style={{ float: 'right' }}></i>
                                                </div>
                                                { tab.foodSubCategories ? tab.foodSubCategories.map((item, newIndex) => {
                                                    return (<div key={newIndex} className={this.state.activeIndex === index && this.state.eventStatus ? "content show" : "content hide"}>

                                                        <div className={this.state.foodIndex == newIndex && this.state.subFoodCategoryId == item.subFoodCategoryId ? "activeSubmenuContainer" : "submenuContainer"} onClick={() => this.onchangeEvent(tab.foodCategoryId, item, newIndex)}
                                                        >  {item.subFoodCategoryName}
                                                        </div>
                                                    </div>)
                                                }) : null}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>


                <section className="eventContainer">
                    <div className="row">
                        <div className="col-md-offset-2 col-md-2 col-md-offset-4 col-sm-8">
                            <div>
                                <span className="subTextNew">Event : {eventName}</span>
                            </div>
                        </div>
                        <div className=" col-md-2 col-sm-12">
                            <div>
                                <span className="subTextNew">Location: {this.props.history.location.state.eventAddress}</span>
                            </div>
                        </div>
                        <div className=" col-md-4 col-sm-12">
                            <span className="subTextNew">Event Date:  <DatePicker
                                value={this.state.startDate}
                                selected={this.state.startDate}
                                onChange={(date) => this.handleChange(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={12}
                                dateFormat="dd/MM/yyyy  hh:mm a"
                            /></span>
                        </div>
                        <div>
                        </div>
                    </div>
                </section>
                <section className="full-detail" style={{ height: '530px', overflowY: 'auto' }}>
                    {this.state.DishesName != '' && this.state.eventId != null ?
                        <div>
                            {eventArray.map((food, k) => {

                                return (
                                    this.state.foodCategoryId == food.foodCategoryId && food.foodSubCategories.map((tree, m) => {
                                        return (
                                            this.state.subFoodCategoryName == tree.subFoodCategoryName && tree.dishes && tree.dishes.map((sub, n) => {

                                                return (
                                                    <div className="boxContainer" key={n} onClick={(event) => this.cardChangeEvent(sub, food.foodCategoryId, tree.subFoodCategoryId, food.foodCategoryName, tree.subFoodCategoryName)}>
                                                        <div className='col-md-3 col-sm-12' >
                                                            <div className="paid-candidate-container mrg-10 random" >

                                                                {
                                                                    this.orderList.findIndex(x => x.dishId == sub.dishId) > -1 ?
                                                                        <i className="fa fa-check" style={{ position: 'absolute', marginLeft: '75px', fontSize: 22, color: 'blue', backgroundColor: 'aliceblue' }}>

                                                                        </i> : null}
                                                                <div className="paid-candidate-box-random">
                                                                    <div className="newstyle">
                                                                        <div className="paid-candidate-box-thumb">
                                                                            <img src={require(`../../assets/images/Foods/${sub.imageName}`)} className="random-img" alt="" />
                                                                        </div>
                                                                        <div className="paid-candidate-box-detail">
                                                                            <h4 style={{ textTransform: "capitalize" }}>{sub.dishName}</h4>
                                                                            <span className="desination"></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <p className="btn btn-paid-candidate bt-1" >&#8377;  {sub.price}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            })
                                        )
                                    })


                                )
                            })}


                        </div> : <div className="full-detail">
                            <div className="background">
                                <p className="bg-text">Select Desired Food Category </p>

                            </div>
                        </div>

                    }

                </section>
                <div style={{ height: 20, marginBottom: 15 }}>
                    {this.state.eventId != null || this.state.DishesName != '' ?
                        <div className='row' style={{ flex: 1, flexDirection: 'row', marginRight: 10, alignItems: 'center', marginTop: 10 }}>
                            <div className="col-md-offset-10 col-md-2 ">
                                <button className='btn btn-success' disabled={this.orderList.length > 0 ? false : true} type='submit' onClick={() => this.orderSubmit()}>Order It!</button>
                            </div>
                        </div>
                        : null}

                    <CommonModal ref={(ref) => this.modalRef = ref} total={this.state.totalPrice} {...this.props} />
                    <CommonModal ref={(ref) => this.confirmRef = ref} total={this.state.totalPrice}  {...this.props} />
                </div>


            </div >


        );
    }
}


export default OrderPage;
