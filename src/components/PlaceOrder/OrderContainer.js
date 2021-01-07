import * as React from 'react';
import { connect } from 'react-redux';
import OrderPage from "./OrderPage";
import CommonModal from "../common/modal/Modal";
import DishesData from '../../data/Dishes.json';
import EventData from '../../data/EventDetails.json';


class OrderContainer extends React.Component {

    constructor(props) {
        super(props)
        this.modalRef=null;
        
    }

    
    

    render() {
    
        return (
            <div>               
                <CommonModal ref={(ref) => this.modalRef = ref} />                
                <OrderPage modalRef={this.modalRef} DishesData={DishesData} EventData={EventData} {...this.props} />
               
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    candidate: state.candidate
   });

export default connect(mapStateToProps)(OrderContainer);
