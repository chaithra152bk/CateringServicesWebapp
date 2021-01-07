import React from "react";

export const SideNav = ({ }) => {
    return (
        <nav className="navbar navbar-fixed-top">
            <ul className="nav navbar-nav side-nav">
                <li>
                    <a href="investigaciones/favoritas"><i className="fa fa-fw fa-user-plus"></i>  MENU 3</a>
                </li>
                <li>
                    <a href="sugerencias"><i className="fa fa-fw fa-paper-plane-o"></i> MENU 4</a>
                </li>
                <li>
                    <a href="faq"><i className="fa fa-fw fa fa-question-circle"></i> MENU 5</a>
                </li>
            </ul>
        </nav>
    );
};