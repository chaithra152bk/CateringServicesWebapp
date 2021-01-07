import React from 'react'
import PropTypes from 'prop-types'
// import { DateTimePicker, DatePicker, KeyboardDatePicker   } from '@material-ui/pickers'
import * as moment from "moment";

class FDateTimePicker extends React.PureComponent {
  // calendarType = ()=>{
  //   const {type} = this.props;
  //   switch(type){
  //     case 'datePicker':
  //       return DatePicker;
  //     case 'keyboardDatePicker':
  //       return KeyboardDatePicker;
  //     default:
  //       return DateTimePicker;
  //   }
  // }

  render() {
    const {
      label,
      field,
      value,
      form: { touched, errors, values, setFieldValue },
      ...other
    } = this.props
    const ShowCalendar = this.calendarType();
    const errorText = errors[field.name]
    const hasError = touched[field.name] && errorText !== undefined;
    const selectedValue = value?value:values[field.name]?values[field.name]:null;
    return (
      <ShowCalendar
        label={label}
        error={hasError}
        format="L"      
        variant="inline"
        helperText={hasError ? errorText : ''}
        onChange={value => setFieldValue(field.name, value)}
        value={selectedValue}
        {...other}
      />
    )
  }
}

FDateTimePicker.propTypes = {
  label: PropTypes.string.isRequired,
  field: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  form: PropTypes.shape({
    dirty: PropTypes.bool,
    errors: PropTypes.object,
  }).isRequired,
  fullWidth: PropTypes.bool,
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  ampm: PropTypes.bool,
  autoOk: PropTypes.bool,
}

FDateTimePicker.defaultProps = {
  fullWidth: true,
  margin: 'normal',
  ampm: false,
  autoOk: true,
}

export default FDateTimePicker
