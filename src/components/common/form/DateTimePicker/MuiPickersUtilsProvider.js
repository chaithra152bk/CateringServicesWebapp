import React from "react";
// import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; 

 const fMuiPickersUtilsProvider = (props)=>{
    const {children} = props;
    return (
        <div></div>
        // <MuiPickersUtilsProvider utils={DateFnsUtils}>
        //     {children}
        // </MuiPickersUtilsProvider>
    );
}

export  {fMuiPickersUtilsProvider as MuiPickersUtilsProvider} 