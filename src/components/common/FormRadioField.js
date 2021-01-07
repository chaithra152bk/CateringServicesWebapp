import React from "react";
// import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
import colors from "../../shared/colors"

const RegularRadioField = React.forwardRef((props, ref) => {
    
    const {color, labelText, checked,  ...rest} = props;
    const displayColor = color?color:colors.primaryColor;
    return (
        <div></div>
        // <FormControlLabel {...rest} ref={ref}          
        // control={<Radio color={displayColor} />}
        // labelPlacement="start"
        // label={labelText}
        // checked={checked}></FormControlLabel>
    );
});

export default RegularRadioField;