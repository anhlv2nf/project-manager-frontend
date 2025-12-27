import React, { useEffect, useRef, useState } from 'react'
import { Dropdown, DropdownMenu, DropdownToggle, Form, Image, ListGroup, Modal } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { MENUITEMS } from '../sidebar/nav';
import { getState, setState } from '../../../services/switcherServices';
import { Link, useNavigate } from 'react-router-dom';
import logo1 from "../../../assets/images/brand-logos/desktop-logo.png";
import logo2 from "../../../assets/images/brand-logos/toggle-dark.png";
import logo3 from "../../../assets/images/brand-logos/desktop-dark.png";
import logo4 from "../../../assets/images/brand-logos/toggle-logo.png";
import face1 from "../../../assets/images/faces/1.jpg";
import us_flag from '../../../assets/images/flags/us_flag.jpg';
import SpkButton from '../@spk-reusable-components/general-reusable/reusable-uielements/spk-buttons';
import authService from '../../../services/authService';

import ChangePassword from '../../ChangePassword';

const Header = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();
    const [showChangePwd, setShowChangePwd] = useState(false);

    let [variable, _setVariable] = useState(getState());

    function menuClose() {
        const theme = getState();
        if (window.innerWidth <= 992) {
            const newState = { toggled: "close" }
            setState(newState);
        }
        if (window.innerWidth >= 992) {
            const local_varaiable = theme;
            const newToggledValue = local_varaiable.toggled ? local_varaiable.toggled : '';
            setState({ toggled: newToggledValue });
        }
    }

    const overlayRef = useRef(null);
    const Query = (selector) => document.querySelector(selector)

    const toggleSidebar = () => {
        const theme = getState();
        const sidemenuType = theme.dataNavLayout;
        if (window.innerWidth >= 992) {
            if (sidemenuType === "vertical") {
                const verticalStyle = theme.dataVerticalStyle;
                const navStyle = theme.dataNavStyle;
                switch (verticalStyle) {
                    case "closed":
                        setState({
                            dataNavStyle: "",
                            toggled: theme.toggled === "close-menu-close" ? "" : "close-menu-close"
                        });
                        break;
                    case "overlay":
                        setState({
                            dataNavStyle: "",
                            toggled: theme.toggled === "icon-overlay-close" ? "" : "icon-overlay-close",
                            iconOverlay: ""
                        });
                        if (theme.toggled !== "icon-overlay-close" && window.innerWidth >= 992) {
                            setState({
                                toggled: "icon-overlay-close",
                                iconOverlay: "",
                            });
                        }
                        break;
                    case "icontext":
                        setState({
                            dataNavStyle: "",
                            toggled: theme.toggled === "icon-text-close" ? "" : "icon-text-close"
                        });
                        break;
                    case "doublemenu":
                        setState({ dataNavStyle: "" });
                        if (theme.toggled === "double-menu-open") {
                            setState({ toggled: "double-menu-close" });
                        } else {
                            const sidemenu = Query(".side-menu__item.active");
                            if (sidemenu) {
                                setState({ toggled: "double-menu-open" });
                                if (sidemenu.nextElementSibling) {
                                    sidemenu.nextElementSibling.classList.add("double-menu-active");
                                } else {
                                    setState({ toggled: "double-menu-close" });
                                }
                            }
                        }
                        break;
                    case "detached":
                        setState({
                            toggled: theme.toggled === "detached-close" ? "" : "detached-close",
                            iconOverlay: ""
                        });
                        break;
                    default:
                        setState({ toggled: "" });
                        break;
                }
                switch (navStyle) {
                    case "menu-click":
                        setState({ toggled: theme.toggled === "menu-click-closed" ? "" : "menu-click-closed" });
                        break;
                    case "menu-hover":
                        setState({ toggled: theme.toggled === "menu-hover-closed" ? "" : "menu-hover-closed" });
                        break;
                    case "icon-click":
                        setState({ toggled: theme.toggled === "icon-click-closed" ? "" : "icon-click-closed" });
                        break;
                    case "icon-hover":
                        setState({ toggled: theme.toggled === "icon-hover-closed" ? "" : "icon-hover-closed" });
                        break;
                }
            }
        } else {
            if (theme.toggled === "close") {
                setState({ toggled: "open" });
                setTimeout(() => {
                    const overlay = overlayRef.current
                    if (overlay) {
                        overlay.classList.add("active");
                        overlay.onclick = () => {
                            overlay.classList.remove("active");
                            menuClose();
                        };
                    }
                }, 100);
            } else {
                setState({ toggled: "close" });
            }
        }
    };

    const handleLogout = () => {
        if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
            authService.logout();
            navigate('/login');
        }
    };

    const [isFullscreen, setIsFullscreen] = useState(false);
    const toggleFullscreen = () => {
        if (!isFullscreen) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
        }
    };
    useEffect(() => {
        const fullscreenChangeHandler = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", fullscreenChangeHandler);
        return () => {
            document.removeEventListener("fullscreenchange", fullscreenChangeHandler);
        };
    }, []);

    const toggleTheme = () => {
        const currentTheme = getState();
        const newState = {
            dataThemeMode: currentTheme.dataThemeMode === 'dark' ? 'light' : 'dark',
            dataHeaderStyles: currentTheme.dataThemeMode === 'transparent' ? 'light' : 'transparent',
            dataMenuStyles: currentTheme.dataThemeMode === 'transparent' ? 'light' : 'transparent',
        }
        setState(newState)
        if (newState.dataThemeMode != 'dark') {
            setState({ bodyBg: '', lightRgb: '', bodyBg2: '', inputBorder: '', formControlBg: '', gray: '', })
            localStorage.setItem("vyzorlightTheme", "light");
            localStorage.removeItem("vyzordarkTheme");
        } else {
            localStorage.setItem("vyzordarkTheme", "dark");
            localStorage.removeItem("vyzorlightTheme");
        }
    }

    return (
        <header className="app-header sticky" id="header">
            <div className="main-header-container container-fluid">
                <div className="header-content-left">
                    <div className="header-element">
                        <div className="horizontal-logo">
                            <Link to="/" className="header-logo">
                                <Image src={logo1} alt="logo" className="desktop-logo" />
                                <Image src={logo2} alt="logo" className="toggle-dark" />
                                <Image src={logo3} alt="logo" className="desktop-dark" />
                                <Image src={logo4} alt="logo" className="toggle-logo" />
                            </Link>
                        </div>
                    </div>
                    <div className="header-element mx-lg-0 mx-2">
                        <Link aria-label="Hide Sidebar" onClick={toggleSidebar} className="sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle" to="#!"><span></span></Link>
                    </div>
                </div>

                <ul className="header-content-right">
                    <li className="header-element header-theme-mode">
                        <Link to="#!" className="header-link layout-setting" onClick={toggleTheme}>
                            <span className="light-layout">
                                <svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M108.11,28.11A96.09,96.09,0,0,0,227.89,147.89,96,96,0,1,1,108.11,28.11Z" opacity="0.2" /><path d="M108.11,28.11A96.09,96.09,0,0,0,227.89,147.89,96,96,0,1,1,108.11,28.11Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
                            </span>
                            <span className="dark-layout">
                                <svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><circle cx="128" cy="128" r="56" opacity="0.2" /><line x1="128" y1="40" x2="128" y2="32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><circle cx="128" cy="128" r="56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="64" y1="64" x2="56" y2="56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="64" y1="192" x2="56" y2="200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="192" y1="64" x2="200" y2="56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="192" y1="192" x2="200" y2="200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="40" y1="128" x2="32" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="128" y1="216" x2="128" y2="224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="216" y1="128" x2="224" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
                            </span>
                        </Link>
                    </li>

                    <Dropdown className="header-element header-profile">
                        <Dropdown.Toggle as="a" variant='' className="header-link dropdown-toggle" id="mainHeaderProfile" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="d-flex align-items-center">
                                <div className="me-sm-2 me-0">
                                    <Image src={face1} alt="img" width="32" height="32" className="rounded-circle" />
                                </div>
                                <div className="d-sm-block d-none text-start">
                                    <p className="fw-semibold mb-0 lh-1">{user?.username || 'User'}</p>
                                    <span className="op-7 fw-normal d-block fs-11">{user?.role || 'Role'}</span>
                                </div>
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="main-header-dropdown dropdown-menu-end pt-0 overflow-hidden" aria-labelledby="mainHeaderProfile">
                            <li><Link className="dropdown-item d-flex" to="#!"><i className="ri-user-line fs-18 me-2 op-7"></i>Profile</Link></li>
                            <li><Link className="dropdown-item d-flex" to="#!" onClick={() => setShowChangePwd(true)}><i className="ri-settings-2-line fs-18 me-2 op-7"></i>Change Password</Link></li>
                            <li className="dropdown-divider"></li>
                            <li><Link className="dropdown-item d-flex" to="#!" onClick={handleLogout}><i className="ri-logout-box-line fs-18 me-2 op-7"></i>Log Out</Link></li>
                        </Dropdown.Menu>
                    </Dropdown>
                </ul>
            </div>
            <ChangePassword
                show={showChangePwd}
                onClose={() => setShowChangePwd(false)}
            />
        </header>
    )
}

export default Header
