import React from 'react';
import DayPickerInput from "react-day-picker/DayPickerInput";
import MomentLocaleUtils from 'react-day-picker/moment';
import * as moment from "../../utils/helper/moment";
import {YearMonthForm} from './YearMonthForm';
import constant from "../../shared/constant"
import 'react-day-picker/lib/style.css';

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, new Date().getMonth());
const toMonth = new Date(currentYear + constant.EXPIRY_DATE_TILL_YEAR, constant.EXPIRY_TILL_MONTH);

export default class InputCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: props.initialDate ? new Date(props.initialDate) : fromMonth,
            changeInitialDate: props.initialDate,
            selectedLanguage: props.selectedLanguage ||  constant.NORWAY_LANGUAGE_CODE
        };
    }

    componentDidUpdate(prevProps){
        const { initialDate } = this.props;
        if(prevProps.initialDate != initialDate && initialDate != null){
            this.setState({month: new Date(initialDate)})
        }
    }

    dayChangeHandle = (value)=>{
        const { handleDayChange } = this.props;
        this.setState({ changeInitialDate: value })
        handleDayChange(value)
    }

    handleYearMonthChange =(month)=> {
        this.setState({ month });
    }

    render() {
        const {emptyDateMessage, inputName, initialDate} = this.props;
        const modifiers = {
            higlightedDayInsideCalendar: new Date(initialDate),
        };

        return (
        <div className="YearNavigation">
            <DayPickerInput
                inputProps={{
                    name: inputName,
                    autoComplete: 'off'
                }} 
                dayPickerProps={{
                    localeUtils:MomentLocaleUtils,
                    locale:this.state.selectedLanguage, 
                    modifiers,
                    month:  this.state.month,
                    fromMonth:fromMonth,
                    toMonth:toMonth,
                    captionElement:({ date }) => (
                        <YearMonthForm
                            date={date}
                            toMonth={toMonth}
                            fromMonth={fromMonth}
                            localeUtils={moment}
                            onChange={this.handleYearMonthChange}
                        />
                    )
                }} 
                formatDate={()=>moment.normalDate(this.state.changeInitialDate)}
                format="DD/MM/YYYY"  
                onDayChange={(value)=>this.dayChangeHandle(value)} 
                value={initialDate ? moment.normalDate(initialDate) : '' } 
            />
        </div>
        );
    }
}
