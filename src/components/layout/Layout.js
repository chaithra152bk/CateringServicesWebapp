import React, { useState } from 'react';
import * as sessionAction from "../../saga/session-saga";
import constant from '../../shared/constant';
import * as helper from '../../utils/helper/helper';
import CommonModal from "../common/modal/Modal";
import Footer from './Footer';
import NavMenu from './NavMenu';
import Routes from './routes';
import Sidebar from './SidebarMenu';

export default (props) => {
    let modalRef = null
    const [open, setOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const role = helper.fetchRole();

    const { apiProgress } = props;
    const progress = apiProgress.get('progress');
    const openSideMenuCallback = () => {
        setOpen(!open)
    }

    const onOperationButtonPressCallback = (value) => {
        switch (value) {
            case constant.SEND_MAIL:
                sendMail();
                break;
            case constant.LOGOUT:
                logout();
                break;
            default:
                return;
        }
    }


    const modalHeader = () => {
        const { t } = props;
        return <h2 className="detail-title">{t("send_mail.model_header")}</h2>
    }

    const logout = () => {
        const { t } = props;
        setOpen(false)
        if (helper.confirmValidation(t("common.confirm_logout")))
            props.dispatch(sessionAction.logout(props.history))
    }

    const onLinkPressCallback = () => {
        setOpen(false);
    }

    const userLayout = () => {
        const { history: { location: { pathname } } } = props;
        let isMobile = windowWidth < 992;
        let sideMenu = false;
        if (role && pathname != constant.HOME_PAGE){
            sideMenu = true
        }
            // sideMenu = true;
        else if (role && isMobile && pathname == constant.HOME_PAGE && pathname == '/login')
            sideMenu = false
        else
            sideMenu = false
        return (
            <div className={open ? 'nav-open' : ''}>
                {pathname != constant.HOME_PAGE && pathname != '/login' ? <NavMenu {...props} openSideMenu={openSideMenuCallback} updateWindowWidth={(v) => setWindowWidth(v)} pathname={pathname} role={role} /> : <NavMenu {...props} />}
                {/* {pathname != constant.HOME_PAGE &&  pathname != '/login' && !sideMenu ? <Sidebar {...props} routes={Routes} role={role} onLinkPress={onLinkPressCallback} onOperationButtonPress={onOperationButtonPressCallback} /> : <NavMenu {...props} /> } */}
                <div className="container-height">
                    <div className={`${pathname != constant.HOME_PAGE && pathname != '/orders' && !sideMenu ? 'main-panel' : ''}`}>
                        {props.children}
                       <Footer {...props} />
                    </div>
                </div>
                {role && <CommonModal ref={(ref) => modalRef = ref} />}
            </div>
        )
    }

    return <React.Fragment>
        {progress && <div className="loading" />}
        {userLayout()}
    </React.Fragment>
};
