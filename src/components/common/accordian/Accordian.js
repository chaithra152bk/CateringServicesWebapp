import React, { useState, useRef, useEffect } from "react";

import "./accordion.css";


class Tab extends React.Component{
  render(){
  	return(
    	<div className="tab">
    	   <div className="title flex jc-btwn"  onClick={()=>{
         this.props.handleclick(this.props.id)
         }}>
    	     <span>{this.props.title}</span>
           <i className={this.props.active?"fa fa-minus" : "fa fa-plus"}></i>
    	   </div>
         <div className={this.props.active ? "content show" : "content hide"}>
            {this.props.content}
         </div>
    	</div>
    )
  }
}
// import {  } from "react";

// function Accordion(props) {
//   const { activeTab, index, scrollHeight, sideScreen, lookupDropdown } = props;
//   const [setHeight, setHeightState] = useState("0px");
//   const [setRotate, setRotateState] = useState("fa-chevron-down");
//   const [isActive, setIsActive] = useState(false)
//   // const isActive = activeTab === index;
//   const content = useRef(null);

//   useEffect(()=>{   
//     index && setIsActive(activeTab === index);
//     if(scrollHeight)
//       (scrollHeight && isActive) ? scrollHeight(content.current.scrollHeight) : scrollHeight(window.innerHeight);

//       let downIcon = !sideScreen?"fa-chevron-down":"fa-plus";
//       let upIcon = !sideScreen?"fa-chevron-up": "fa-minus"

//       setHeightState(
//         !isActive ? "0px" : `${content.current.scrollHeight}px`
//       );
//       setRotateState(
//         !isActive ? downIcon : upIcon
//       );
//   })

//   const handleClick = () => {
//     setIsActive(!isActive);
//   }

//   const headerSection = () => {
//     if(sideScreen){
//       return (
//         <div className="accordionHeader" onClick={index?props.activateTab:handleClick}>
//           <div>{props.title}</div>
//           <span className={`${!sideScreen?'chevron-icons':''}`}>
//             <i className={`fa ${setRotate}`} ></i>
//           </span>
//       </div>
//       )
//     }
//     else {
//       return (
//         <div className="panel-heading collapsed detail-title education-header" onClick={index?props.activateTab:handleClick}>
//           <span className={`${!sideScreen?'chevron-icons':''}`}>
//             <i className={`fa ${setRotate}`} ></i>
//           </span>
//           <h4 className="recruiter-header-title">{props.title}</h4>
//       </div> 
//       )
//     }
//   }

//   return (
//     <div className="accordionSection">
//       {headerSection()}
//       <div
//         ref={content}
//         style={{ maxHeight: `${setHeight}`, flex:1, flexDirection:'row' }}
//         className={`${lookupDropdown ? !isActive ? "accordionContent" : `${sideScreen ? 'accordionContentOpen' : ''} accordionContentShow`:"accordionContent"}`}
//       >
//         <div className={`${sideScreen?'padd-0  mrg-0' : ''} panelContent`} style={sideScreen?{}:{}}>
//         {props.content}
//         </div>
//       </div>
//     </div>
//   );
// }

 export default Tab;
