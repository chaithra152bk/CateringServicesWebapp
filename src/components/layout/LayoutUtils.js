import React, { useEffect, useState } from 'react';

export const LayoutBody = (props) => {
    const { children } = props;
    return (
        <div className="layoutBody">
            {children}
        </div>
    )
};

export const DropdownMenuWrapper = (props) => {
    const { children, t, title, windowWidth } = props;
    const [isOpen, setIsOpen] = useState(false);

    const onMouseEnter = () => {
        setIsOpen(true)
    }

    const onMouseLeave = () => {
        setIsOpen(false)
    }
    let isMobile = windowWidth < 992;
    let openMenu = isMobile || isOpen
    return (
        <ul className="nav navbar-nav " onMouseOver={onMouseEnter} onMouseLeave={onMouseLeave} >
            <li className={`dropdown ${openMenu?'on':''}`}>
                {!isMobile && <a href="javascript:;" >{title}</a>}
                <ul className={`dropdown-menu content menu-col  animated ${openMenu?'fadeInDown':'fadeOutUp'}`} role="menu" style={{display: openMenu?'block':'none', opacity: 1}}>
                    {children}
                </ul>
            </li>
        </ul>
    )
}

export const SideBar = (props) => {
    const { children, t } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.screen.width);
    const [windowHeight, setWindowHeight] = useState(window.screen.height);

    const updateWindowDimensions = () => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    }

    useEffect(() => {
        window.addEventListener('resize', updateWindowDimensions);
        return () => {
            window.removeEventListener('resize', updateWindowDimensions);
        };
    }, [windowWidth]);

    const openSideFilter = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="full-sidebar-wrap">
            <a onClick={openSideFilter} className="btn btn-dark full-width mrg-bot-20 hidden-lg hidden-md hidden-xl"><i className="ti-filter mrg-r-5"></i>{t('common.filter_search')}</a>
            {windowWidth > 991?<div className="show-hide-sidebar hidden-xs hidden-sm">
                {children}
            </div>:
            <div className="filter-sidebar" style={isOpen?{width: 320}:{}}>
                <a onClick={openSideFilter} className="closebtn" ><i className="ti-close"></i></a>
                <div className="show-hide-sidebar" style={{minHeight: windowHeight/2}}>
                    {children}
                </div>
            </div>}
        </div>
    )
};

export const SideBarWidgets = (props) => {
    const { children } = props;
    return (
        <div className="sidebar-widgets">
            <div className="ur-detail-wrap">
            <div className="ur-detail-wrap-body">
                {children}
            </div>
            </div>
        </div>
    )
};

export const SideBarLabel = (props) => {
    return <div className={`ur-detail-wrap-header ${props.className && props.className}`}>
        <h4>{props.label}</h4>
    </div>
}

export const LayoutResults = (props) => {
    const { children } = props;
    return (
        <div className="layoutResults">
            {children}
        </div>
    )
};
