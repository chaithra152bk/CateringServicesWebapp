import * as React from 'react';
import { NavLink } from 'react-router-dom';
import constant from '../../shared/constant';
import './layoutStyles.css';
import flag from '../../resources/flag';
import logo from '../../resources/logo';
import * as translation from "../../actions/action-translation";
import * as moment from "../../utils/helper/moment";
import * as sessionAction from "../../saga/session-saga";
import * as sessionStorage from "../../utils/sessionStorage";
import CommonModal from "../common/modal/Modal";
import { DropdownMenuWrapper } from './LayoutUtils';


export default class NavMenu extends React.PureComponent {
	constructor(props) {
		super(props);
		this.modalRef;
		this.state = {
			isOpen: false,
			prevScrollpos: window.pageYOffset,
			visible: false,
			prev: 0,
			currentRoute: '',
			dropdownOpen: false,
			menuToggle: false,
			windowWidth: window.screen.width
		}
	};

	componentDidMount() {
		this.setState({ prev: window.scrollY })
		window.addEventListener("scroll", this.handleScroll)
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	logout() {
		this.props.dispatch(sessionAction.logout(this.props.history))
	}

	componentDidUpdate() {
		const { location: { pathname } } = this.props;
		const { currentRoute } = this.state;
		if (currentRoute != pathname)
			this.setState({ currentRoute: pathname })
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll)
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions = () => {
		const { updateWindowWidth } = this.props;
		updateWindowWidth && updateWindowWidth(window.innerWidth)
		this.setState({ windowWidth: window.innerWidth })
	}

	handleScroll = (e) => {
		const window = e.currentTarget;

		if (this.state.prev > window.scrollY && window.scrollY < 50) {
			this.setState({ visible: false })
		} else if (this.state.prev < window.scrollY) {
			this.setState({ visible: true })
		}

		this.setState({ prev: window.scrollY })
	}

	changeLanguage = (languageCode) => {
		this.props.i18n.changeLanguage(languageCode);
		this.props.dispatch(translation.switchLanguage(languageCode));
		moment.changeMomentLocale(languageCode);
		this.closeMenu();
	}

	closeMenu = () => {
		this.setState({ menuToggle: false });
	}

	onClickMobileMenu = () => {
		const { openSideMenu } = this.props;
		if (openSideMenu)
			openSideMenu();
		else
			this.setState({ menuToggle: !this.state.menuToggle })
	}


	

	modalHeader = () => {
		const { t } = this.props;
		return <h2 className="detail-title">{t("send_mail.model_header")}</h2>
	}

	recruiterAuthMenu = (title) => {
		const { t } = this.props;
		return (
			<DropdownMenuWrapper windowWidth={this.state.windowWidth} title={title}>
				<li>
					<NavLink onClick={() => this.closeMenu()} to={constant.RECRUITER_DASHBOARD}>{t('common.dasboard')}</NavLink>
				</li>
				<li>
					<NavLink onClick={() => this.closeMenu()} to={constant.RECRUITER_POST_JOB_SCREEN}>{t('navigation.post_job')}</NavLink>
				</li>
				<li>
					<NavLink onClick={() => this.closeMenu()} to={constant.JOB_LIST_SCREEN}>{t('navigation.jobs_posted')}</NavLink>
				</li>
				<li>
					<NavLink onClick={() => this.closeMenu()} to={constant.RECRUITER_CANDIDATE_SEARCH_SCREEN}>{t('common.candidate_search')}</NavLink>
				</li>
				<li>
					<NavLink onClick={() => this.closeMenu()} to={constant.RECRUITER_PROFILE_EDIT_SCREEN}>{t('navigation.profile')}</NavLink>
				</li>
				<li onClick={() => this.sendMail()}>
					<NavLink onClick={() => this.closeMenu()} to="#"> {t('navigation.send_mail')}</NavLink>
				</li>
				{this.commonAuthLink()}
			</DropdownMenuWrapper>
		)
	}

	candidateAuthMenu = (title) => {
		const { t } = this.props;
		return (
			<li>
				{/* <NavLink to={'/'} className="navMenuRightTitle">{'chaithra B k'}</NavLink> */}
			</li>
		)
		// return (
		// 	<DropdownMenuWrapper windowWidth={this.state.windowWidth} title={title}>
		// 		<li>
		// 			<NavLink onClick={() => this.closeMenu()} to={constant.CANDIDATE_APPLIED_JOBS_SCREEN}>{t('navigation.job_applied')}</NavLink>
		// 		</li>
		// 		<li>
		// 			<NavLink onClick={() => this.closeMenu()} to={constant.CANDIDATE_PROFILE_EDIT_SCREEN}>{t('navigation.profile')}</NavLink>
		// 		</li>
		// 		<li>
		// 			<NavLink onClick={() => this.closeMenu()} to={constant.CANDIDATE_SEARCH_SCREEN}>{t('common.candidate_search')}</NavLink>
		// 		</li>
		// 		{this.commonAuthLink()}
		// 	</DropdownMenuWrapper>
		// );
	}

	commonAuthLink = () => {
		const { t } = this.props;
		return (
			<React.Fragment>
				<li>
					<NavLink onClick={() => this.closeMenu()} to={constant.USER_SETTINGS}>{t('navigation.settings')}</NavLink>
				</li>
				<li>
					<NavLink onClick={() => this.closeMenu()} to={constant.CHANGE_PASSWORD_SCREEN}>{t('navigation.change_password')}</NavLink>
				</li>
				<li onClick={() => this.closeMenu()} onClick={() => this.logout()}>
					<NavLink to="#">{t('navigation.logout')}</NavLink>
				</li>
			</React.Fragment>
		)
	}

	guestLink = () => {
		const { t } = this.props;
		return (
			<React.Fragment>
				<li>
					<NavLink onClick={() => this.closeMenu()} to={'/orders'}><i className="fa fa-shopping-cart" aria-hidden="true"></i>{'Place an Order'}</NavLink>
				</li>
				{/* <li className="right-nav-bar-items">
					<img className="flag-navigation" alt={t('navigation.english_language')} title={t('navigation.english_language')} onClick={() => this.changeLanguage(constant.ENGLISH_LANGUAGE_CODE)} src={flag.england} />
				</li>
				<li className="right-nav-bar-items">
					<img className="flag-navigation" alt={t('navigation.norway_language')} title={t('navigation.norway_language')} onClick={() => this.changeLanguage(constant.NORWAY_LANGUAGE_CODE)} src={flag.norway} />
				</li> */}
			</React.Fragment>
		)
	}

	render() {
		const { t, userData, role, pathname } = this.props;
		const { windowWidth } = this.state;
		const authData = JSON.parse(sessionStorage.getAuthToken());
		const userfirstName = userData.firstName || '';
		const userlastname = userData.lastName ? userData.lastName : '';
		const userEmail = userData.email || '';
		let title = userfirstName ? userfirstName + ' ' + userlastname : userEmail;

		let isMobile = false;

		const { visible, currentRoute } = this.state
		const headerWrapperClass = `navbar navbar-default ${currentRoute == '/' && !visible && 'navbar-transparent'} navbar-fixed white bootsnav`;
		return (
			<header>
				<nav className={headerWrapperClass}>
					<div className={`col-md-12 col-sm-12${!role ? 'footer-and-header-container' : ''} ${ isMobile && pathname == constant.HOME_PAGE ? 'mobile-nav' : ''}`}>
						{(isMobile && pathname == constant.HOME_PAGE) ? <ul>{isMobile && this.candidateAuthMenu(title)}</ul> : <button type="button" onClick={this.onClickMobileMenu} className="navbar-toggle">
							<i className="fa fa-bars"></i>
						</button>}
						<div className="navbar-header">
							<div className="navbar-brand">
								<NavLink to={'/'}>
									<h3 style={{color:'white'}}>Catering Services</h3>
									{/* <img src={logo.header_logo} className="logo logo-scrolled" alt="" /> */}
								</NavLink>
							</div>
						</div>
						<div className={`${!this.state.menuToggle && 'collapse'} navbar-collapse`} id="navbar-menu">
							<ul className="nav navbar-nav navbar-right">
								{(pathname == '/orders' ) ? (pathname == '/orders') && this.candidateAuthMenu(title) : this.guestLink()}
							</ul>
						</div>
					</div>
				</nav>
				<CommonModal ref={(ref) => this.modalRef = ref} />
			</header>
		);
	}
}
