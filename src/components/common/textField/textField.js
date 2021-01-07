import React from "react";
// import TextField from '@material-ui/core/TextField';

const RegularTextField = React.forwardRef((props, ref) => {
    const {color, ...rest} = props;

        return (
            <TextField fullWidth  {...rest} ref={ref}/>
        );
    });

export default RegularTextField;