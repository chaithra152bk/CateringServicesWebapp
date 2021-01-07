import React from 'react'
import PropTypes from 'prop-types'
// import InputLabel from '@material-ui/core/InputLabel'
// import MenuItem from '@material-ui/core/MenuItem'
// import FormControl from '@material-ui/core/FormControl'
// import FormHelperText from '@material-ui/core/FormHelperText'
// import Select from '@material-ui/core/Select'

class CountryPicker extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            selectedCountryValue: this.props.selectedValue ? this.props.selectedValue : 0
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedValue !== this.props.selectedValue) {
            this.setState({ selectedCountryValue: this.props.selectedValue });
        }
    }

    render() {
        let i = 0;
        const {
            required,
            label,
            form: { dirty, touched, errors },
            field: { name, onChange, value },
            options,
            fullWidth,
            margin,
            countryList,
            ...other
        } = this.props
        const id = `sel_${name}`
        const errorText = errors[name]
        const hasError = dirty && touched[name] && errorText !== undefined
        return (
            <div></div>
            // <FormControl
            //     fullWidth
            //     margin={margin}
            //     required={required}
            //     error={hasError}
            // >
            //     <InputLabel htmlFor={id}>{label}</InputLabel>
            //     <Select
            //         onChange={onChange}
            //         value={value}
            //         required={required}
            //         inputProps={{
            //             name,
            //             id: `input_${id}`,
            //         }}
            //         {...other}
            //     >
            //         {countryList.map((item, i) => (
            //             <MenuItem key={i} value={item.value}>
            //                 {item.label} {item.countryName}
            //             </MenuItem>
            //         ))}
            //     </Select>
            //     {hasError && <FormHelperText>{errorText}</FormHelperText>}
            // </FormControl>
        )
    }
}

CountryPicker.propTypes = {
    label: PropTypes.string.isRequired,
    field: PropTypes.shape({
        name: PropTypes.string,
        onChange: PropTypes.func,
        onValueChange: PropTypes.func,
        selectedCountryValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    form: PropTypes.shape({
        dirty: PropTypes.bool,
        errors: PropTypes.object,
    }).isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
        })
    ).isRequired,
    required: PropTypes.bool,
    fullWidth: PropTypes.bool,
    margin: PropTypes.oneOf(['none', 'dense', 'normal']),
}

CountryPicker.defaultProps = {
    required: false,
    fullWidth: true,
    margin: 'normal',
}

CountryPicker.defaultProps = {
    countryList: [
        {
            label: "Deutschland",
            value: 79,
        },
        {
            label: "España",
            value: 199,
        },
        {
            label: "France",
            value: 72,
        },
        {
            label: "Österreich",
            value: 14,
        },
        {
            label: "Schweiz",
            value: 205,
        },
    ]
};

export default CountryPicker
