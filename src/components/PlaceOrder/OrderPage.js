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
            subFoodCategoryName: '',
            DishId: null,
            tabs: this.props.DishesData.eventType[1],
            activeColor: false,
            startDate: new Date(),
            eventActive: false,
            subFoodCategoryId: null,
            foodCategoryId: null,
            subTabs: [],
            activeIndex: null,
            activeCategory: null,
            selectActive: null,
            foodIndex: null,
            eventStatus: false,
            categoryStatus: false
        }

        this.modalRef = null;
        this.confirmRef = null;
        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleCategoryClick = this.handleCategoryClick.bind(this);
        this.orderSubmit = this.orderSubmit.bind(this)
        this.orderList = [];
    }

    handleChange = (date) => {
        this.setState({
            startDate: date
        });
    }

    onchangeEvent = async (id, name, categoryId, index) => {
        this.setState({ eventId: await id })
        this.setState({ subFoodCategoryName: await name.subFoodCategoryName })
        this.setState({ subFoodCategoryId: await name.subFoodCategoryId })
        this.setState({ foodCategoryId: await categoryId })
        this.setState({ navColor: true })
        this.setState({foodIndex: index})
    }

    

    handleTabClick(eventId, index) {
        this.setState({ activeIndex: index })
        this.setState({eventStatus : !this.state.eventStatus})
    }

    handleCategoryClick(category, newIndex)  {
        this.setState({ activeCategory: newIndex })
        this.setState({categoryStatus : !this.state.categoryStatus})
    }

    cardChangeEvent = async (value) => {
        this.setState({ DishId: await value.dishId })

        if (value.dishId == this.state.DishId) {
            if (value.active == true) {
                this.orderList.pop(value)
                value.active = false
            } else {
                this.orderList.push(value)
                value.active = true;
            }
        } else {
            value.active = false;
        }
        this.setState({ activeColor: !this.state.activeColor })
    }

    orderSubmit = () => {
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
            this.modalRef.props.onHide();
            window.location.reload()
        }

    }
    orderDetailPopup = () => {
        let Quantity = 12
        let sum = this.orderList.map(o => o.price).reduce((a, c) => { return a + c });

        return (
            <div style={{ margin: "20px" }}>
                <div className="jobDetail-container-popupView">
                    <div className="row" style={{ backgroundColor: 'lightgray', padding: '20px', marginBottom: 20, marginTop: 10, marginRight: '-19px', marginLeft: '-19px' }}>
                        <div className="col-md-offset-4 col-md-8 col-xs-12" >
                            <div className="orderHeader">Order Details</div>
                        </div>
                    </div>
                    <div>
                        <div className="row" style={{ marginLeft: '5px', marginRight: '5px' }}>
                            <div className="col-md-5 col-sm-6 col-xs-12">
                                <div className="orderLeftText">Date: 12/05/2021</div>
                            </div>
                            <div className="col-md-7 col-sm-6 col-xs-12">
                                <div className="orderRightText">No. of Persons:  {Quantity}</div>
                            </div>

                            <hr />
                            <div className="col-md-5 col-sm-6 col-xs-12" >
                                <div className="orderLeftText">Location: Bangalore</div>
                            </div>
                            <div className="col-md-7 col-sm-6 col-xs-12" >
                                <div className="contactText">Contact No.: 9606345827</div>
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
                                                <div className="orderTableRightText"> {'Rs. '}{value.price}</div>
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
                                <div className="contactText"> Total: {'Rs. '}{sum * Quantity} </div>
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
        let tabarray = this.props.DishesData.eventType[1];
        let eventArray = tabarray.subEventTypes;

        return (

            <div>
                <div id="sidebar" className="sidebar">
                    <div className="sidebarwrap">
                        <div className="list-group panel">

                            <div>
                                <h4 className="list-group-item list-group-item-success" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>Event Types</h4>
                                {
                                    eventArray.map((tab, index) => {
                                        return (

                                            <div className="tab" key={index}>
                                                <div className="list-group-item list-group-item-success" onClick={() => {
                                                    this.handleTabClick(tab.subEventId, index)
                                                }}>
                                                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{tab.subEventName}</span>
                                                    <i className={this.state.activeIndex === index   ? "fa fa-chevron-up" : "fa fa-chevron-down"} style={{ float: 'right' }}></i>
                                                </div>
                                                { tab.foodCategories ? tab.foodCategories.map((item, newIndex) => {
                                                    return (<div key={newIndex} className={this.state.activeIndex === index  ? "content show" : "content hide"}>

                                                        <div className="submenuContainer" onClick={() => {
                                                            this.handleCategoryClick(item, newIndex)
                                                        }}
                                                        >  {item.foodCategoryName}
                                                            <i className={this.state.activeCategory === newIndex ? "fa fa-chevron-up" : "fa fa-chevron-down"} style={{ float: 'right', color: 'black' }}></i>
                                                        </div>
                                                        {item.foodSubCategories ?item.foodSubCategories.map((data, j) => {
                                                            return (<div key={j} className={this.state.activeCategory === newIndex ? "content show" : "content hide"}>

                                                                <div className={ this.state.foodIndex === j ? "tickContainer": "categoryContainer"}
                                                                    onClick={() => this.onchangeEvent(tab.subEventId, data, item.foodCategoryId, j)}>  <a>{data.subFoodCategoryName}</a>
                                                                </div></div>)
                                                        }) : null}

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


                <section style={{ height: '50px' }}>
                    <div className="row">
                        <div className="col-md-offset-2 col-md-2 col-md-offset-4 col-sm-8">
                            <div>
                                <span className="subTextNew">Event Type: Birthday</span>
                            </div>
                        </div>
                        <div className=" col-md-2 col-sm-12">
                            <div>
                                <span className="subTextNew">Location: Bangalore</span>
                            </div>
                        </div>
                        <div className=" col-md-4 col-sm-12">
                            <span className="subTextNew">Event Date:  <DatePicker
                                value={this.state.startDate}
                                selected={this.state.startDate}
                                onChange={(date) => this.handleChange(date)}
                            /></span>
                        </div>
                        <div>
                        </div>
                    </div>
                </section>
                <section className="full-detail" style={{ height: '530px', overflowY: 'auto' }}>
                    {this.state.DishesName != '' && this.state.eventId != null ?
                        <div>
                            {eventArray.map((value, k) => {
                                return (
                                    this.state.eventId == value.subEventId && value.foodCategories.map((food, l) => {
                                        return (
                                            this.state.foodCategoryId == food.foodCategoryId && food.foodSubCategories.map((tree, m) => {
                                                return (
                                                    this.state.subFoodCategoryId == tree.subFoodCategoryId && tree.dishes && tree.dishes.map((sub, n) => {
                                                        return (
                                                            <div className="boxContainer" key={n}>
                                                                <div className='col-md-3 col-sm-12' >
                                                                    <div className="paid-candidate-container mrg-10 random" onClick={() => this.cardChangeEvent(sub)}>
                                                                        {sub.active == false ? null : <i className="fa fa-check" style={{ position: 'absolute', marginLeft: '75px', fontSize: 22, color: 'blue', backgroundColor: 'aliceblue' }}></i>}
                                                                        <div className="paid-candidate-box-random">
                                                                            <div className="newstyle">
                                                                                <div className="paid-candidate-box-thumb">
                                                                                    <img src={require(`../../assets/images/Foods/${sub.imageName}`)} className="random-img" alt="" />
                                                                                </div>
                                                                                <div className="paid-candidate-box-detail">
                                                                                    <h4>{sub.dishName}</h4>
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
                                    })

                                )
                            })}

                          
                        </div> : <div className="full-detail">
                            <div className="background">
                                <p className="bg-text">Select Event type</p>

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

                    <CommonModal ref={(ref) => this.modalRef = ref} />
                    <CommonModal ref={(ref) => this.confirmRef = ref} />
                </div>


            </div >


        );
    }
}


export default OrderPage;
