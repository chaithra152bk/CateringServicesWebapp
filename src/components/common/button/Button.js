import React from "react";

export const Button = (props) => {
    const {label, handlePress, iconType, buttonClass, href } = props;
    const classIcon = iconType&&`fa ${iconType}`;
    const classButton = buttonClass?`btn ${buttonClass}`:'btn call-btn';
    return (
        <a onClick={handlePress} href={href?href:'javascript:void(0)'} className={classButton}>
        {iconType&&<i className={classIcon}></i>}&nbsp;&nbsp;{label}
        </a>
    );
};