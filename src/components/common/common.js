import React from 'react';
import constant from "../../shared/constant";

export const formDisplayText = (icon, text) => {
    return (
        <div className="input-group">
            <span className="input-group-addon"><i className={`fa ${icon}`}></i></span>
            <div className="form-control formDisplayTextWrapper exactText">{text}</div>
        </div>
    )
}

export const formDisplayTextwithHyperLink = (icon, text) => {
    return (
        <div className="input-group">
            <span className="input-group-addon"><i className={`fa ${icon}`}></i></span>
            <div className="form-control formDisplayTextWrapper exactText">
                <a href={String(text).startsWith('http') ? text : 'http://' + text} target="_blank">{text}</a>
            </div>
        </div>
    )
}

export const formDisplayTextwithEmail = (icon, text) => {
    return (
        <div className="input-group">
            <span className="input-group-addon"><i className={`fa ${icon}`}></i></span>
            <div className="form-control formDisplayTextWrapper exactText">
                <a href={`mailto:${text}`}>{text}</a>
            </div>
        </div>
    )
}

export const formDisplayTextArea = (icon, text) => {
    return (
        <div className="input-group">
            <span className="input-group-addon"><i className={`fa ${icon}`}></i></span>
            <div className="form-control formDisplayTextWrapper text-area">{text}</div>
        </div>
    )
}

export const displayMessage = (messageText, url, linkName) => {
    return (
        <div className="simple-bg-screen">
            <div className="wrapper">
                <section className="signup-screen-sec">
                    <div className="container">
                        <div className="display-message-container">
                            <div className="display-message">
                                <div className="center-alignment">{messageText}</div>
                            </div>
                            {url && <div className="display-links">
                                <span><Link className="link-color" to={url}>&nbsp;{linkName}</Link></span>
                            </div>}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export const detailTitle = (text) => {
    return (
        <h2 className="detail-title">{text}</h2>                   
    )
}

export const progress = (props) =>{
    return (
        <React.Fragment>
            <h3 className="progressbar-title">{props.text}</h3>
            <div className="progress">
                <div className="progress-bar" style={{width: props.percent, background: props.color}}>
                    <span className="progress-icon fa fa-plus" style={{borderColor:props.color, color: props.color}}></span>
                    <div className="progress-value">{props.percent}</div>
                </div>
            </div>
        </React.Fragment>
    )
}

export const htmlStringToNormalHtml = (htmlString) => {
    return <div className="exactText" dangerouslySetInnerHTML={{ __html: `${htmlString}` }}/> 
}

export const removeHtmlTags = (htmlString) => {
    var tmp = document.createElement("div");
    tmp.innerHTML = htmlString;
    return tmp.innerText; 
}

export const SwitchToggle = (props) => {
    const {defaultChecked, onChange} = props;

    return (
        <label className="switch">
            <input type="checkbox" onChange={onChange} checked={defaultChecked}/>
            <span className="slider round"></span>
        </label>
    )
}

export const formOnlyText = ( text) => {
    return (
        <div className="input-group">
            <div className="form-control formDisplayTextWrapper Text exactText">{text}</div>
        </div>
    )
}