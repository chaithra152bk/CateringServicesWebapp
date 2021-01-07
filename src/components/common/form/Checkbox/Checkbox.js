import React from 'react'
import PropTypes from 'prop-types'
// import FormControl from '@material-ui/core/FormControl'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import FormHelperText from '@material-ui/core/FormHelperText'
import colors from "../../../../shared/colors";
// import Checkbox from '@material-ui/core/Checkbox'

class FCheckbox extends React.PureComponent {
  render() {
    const {
      label,
      form: { touched, errors, setFieldValue },
      field,
      required,
      checked,
      ...other
    } = this.props

    const errorText = errors[field.name]
    const hasError = touched[field.name] && errorText !== undefined
    return (
      <div>
        
      </div>
      // <FormControl
      //   required={required}
      //   error={hasError}
      //   {...other}
      // >
      //   <FormControlLabel
      //     label={label}
      //     control={
      //       <Checkbox
      //         color={colors.primaryColor}
      //         checked={checked}
      //         onChange={(event) => { setFieldValue(field.name, event.target.checked); }}
      //       />
      //     }
      //   />
      //   {hasError && <FormHelperText>{errorText}</FormHelperText>}
      // </FormControl>
    )
  }
}

FCheckbox.propTypes = {
  label: PropTypes.any.isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object,
    setFieldValue: PropTypes.func,
  }).isRequired,
  checked: PropTypes.bool,
  required: PropTypes.bool,
}

FCheckbox.defaultProps = {
  required: true,
  fullWidth: true,
  margin: 'normal',
  classes: undefined,
}

export default FCheckbox