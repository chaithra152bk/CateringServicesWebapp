import React from 'react'
import PropTypes from 'prop-types'
// import FormControl from '@material-ui/core/FormControl'
// import FormHelperText from '@material-ui/core/FormHelperText'
import ReCAPTCHA from 'react-google-recaptcha';
import config from './../../../../shared/config'

class Recaptcha extends React.PureComponent {

    render() {
      const {
        recaptcha,
        form: { touched, errors, setFieldValue },
        field,
        required,
        ...other
      } = this.props

      const errorText = errors[field.name]
      const hasError = touched[field.name] && errorText !== undefined
      
      return (
        <div></div>
        // <FormControl
        //   required={required}
        //   error={hasError}
        //   {...other}
        // >
        //     <ReCAPTCHA
        //           sitekey={config.Google_Site_Key}
        //           onChange = {value => setFieldValue(field.name, value)}
        //         />
                            
        //     {hasError && <FormHelperText>{errorText}</FormHelperText>}
        // </FormControl>
      )
    }
}
  

Recaptcha.propTypes = {
    form: PropTypes.shape({
        touched: PropTypes.object,
        errors: PropTypes.object,
        setFieldValue: PropTypes.func,
    }).isRequired,
    required: PropTypes.bool,
    recaptcha:PropTypes.string
}

Recaptcha.defaultProps = {
    required: true,
    fullWidth: true,
    margin: 'normal',
    classes: undefined,
}
  
export default Recaptcha