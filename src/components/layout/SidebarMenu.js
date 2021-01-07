import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import constant from '../../shared/constant';
import logo from '../../resources/logo';
import './SidebarMenu.css';
import EventData from '../../data/EventDetails.json';




class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: EventData.events,
      activeTab: 0,
      listHeight: 0
    }
  }

  activeRoute(routeName) {
    return this.props.location.pathname == routeName ? "active" : "";
  }

  activateTabCallback(index) {
    if (this.state.activeTab != index)
      this.setState({ activeTab: index })
    else
      this.setState({ activeTab: 0 })
  }

  scrollHeightCallback(value) {
    this.setState({ listHeight: value })
  }

  render() {


    return (
      <div
        id="sidebar"
        className="sidebar">
        <div className="sidebarwrap">
          {this.state.data.map(e1 => {
            return (
              <ul className="nav" style={{ cursor: 'pointer' }} onClick={() => this.props.history.push('/veg', { event: e1 })}>
                {e1.eventname}
                <li style={{ color: 'white', flexDirection: 'row' }}>

                  {/* <Accordion
                    title={e1.eventname}
                    content={e1.dishes}
                    index={1}
                    activeTab={this.state.activeTab}
                    activateTab={() => this.activateTabCallback(1)}
                    scrollHeight={(value) => this.scrollHeightCallback(value)}
                  /> */}
                  {e1.dishes.map(e2 => {
                    return (<ul>
                      <li style={{ color: 'white', flexDirection: 'row' }} >
                        <NavLink to={{ pathname: '/veg', dishtype: e2 }}> {e2}</NavLink>
                      </li>
                    </ul>
                    );
                  })}
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    );

  }
}

export default Sidebar;