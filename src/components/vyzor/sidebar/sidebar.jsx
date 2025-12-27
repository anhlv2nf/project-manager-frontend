import React, { Fragment, useEffect, useRef, useState } from 'react'
import { MENUITEMS, PM_MENUITEMS } from './nav'
import Menuloop from './menuloop';
import SimpleBar from 'simplebar-react';
import { data$, getState, setState } from '../../../services/switcherServices';
import { Link, useLocation } from 'react-router-dom';
import logo1 from "../../../assets/images/brand-logos/desktop-logo.png";
import logo2 from "../../../assets/images/brand-logos/toggle-dark.png";
import logo3 from "../../../assets/images/brand-logos/desktop-dark.png";
import logo4 from "../../../assets/images/brand-logos/toggle-logo.png";
import background13 from "../../../assets/images/media/backgrounds/13.png";
import media80 from "../../../assets/images/media/media-80.png";
import face10 from "../../../assets/images/faces/10.jpg";
import { Image } from 'react-bootstrap';
import SpkTooltips from '../@spk-reusable-components/general-reusable/reusable-uielements/spk-tooltips';
import authService from '../../../services/authService';
import { USER_ROLES } from '../../../constants/userConstants';

const Sidebar = () => {
	const user = authService.getCurrentUser();
	const currentMenuItems = user?.role === USER_ROLES.MANAGER ? PM_MENUITEMS : MENUITEMS;

	let [variable, setVariable] = useState(getState());
	const local_varaiable = variable;

	useEffect(() => {
		const subscription = data$.subscribe((e) => {
			setVariable(e);
		});
		return () => subscription.unsubscribe();
	}, []);


	const [menuitems, setMenuitems] = useState(currentMenuItems);

	function closeMenuFn() {
		const closeMenuRecursively = (items) => {
			items?.forEach((item) => {
				item.active = false;
				closeMenuRecursively(item.children);
			});
		};
		closeMenuRecursively(currentMenuItems);
		setMenuitems((arr) => [...arr]);
	}


	const [_isSticky, setIsSticky] = useState(false);

	const handleScroll = () => {
		if (window.scrollY > 30) {
			setIsSticky(true);
		} else {
			setIsSticky(false);
		}
	};

	const slidesArrow = (selector) => document.querySelector(selector);

	const SelectorAll = (selector) => document.querySelectorAll(selector);

	useEffect(() => {
		const resizeEventListeners = [
			{ event: 'resize', handler: menuResizeFn },
			{ event: 'resize', handler: checkHoriMenu }
		];
		resizeEventListeners.forEach(({ event, handler }) => {
			window.addEventListener(event, handler);
		});
		const mainContent = slidesArrow(".main-content");
		if (window.innerWidth <= 992) {
			if (mainContent) {
				const newState = {
					toggled: "close"
				}
				setState(newState)
			} else if (document.documentElement.getAttribute('data-nav-layout') == 'horizontal') {
				closeMenuFn();
			}
		}
		if (mainContent) {
			mainContent.addEventListener('click', menuClose);
		}
		window.addEventListener("scroll", handleScroll);
		return () => {
			resizeEventListeners.forEach(({ event, handler }) => {
				window.removeEventListener(event, handler);
			});
			if (mainContent) {
				mainContent.removeEventListener('click', menuClose);
			}
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const Baselocation = useLocation()

	function Onhover() {
		const theme = getState();
		if ((theme.toggled == 'icon-overlay-close' || theme.toggled == 'detached-close') && theme.iconOverlay != 'open') {
			const newState = {
				"iconOverlay": "open"
			}
			setState(newState)
		}

	}
	function Outhover() {
		const theme = getState();
		if ((theme.toggled == "icon-overlay-close" || theme.toggled == "detached-close") && theme.iconOverlay == "open") {
			const newState = {
				"iconOverlay": ""
			}
			setState(newState)
		}
	}

	const overlayRef = useRef(null);

	function menuClose() {

		const theme = getState();;

		if (window.innerWidth <= 992) {
			const newState = {
				toggled: "close"
			}
			setState(newState)
		}
		if (overlayRef.current) {
			overlayRef.current.classList.remove("active");
		}
		if (theme.dataNavLayout === "horizontal" || theme.dataNavStyle === "menu-click" || theme.dataNavStyle === "icon-click") {
			closeMenuFn();
		}
	}


	const WindowPreSize = typeof window !== 'undefined' ? [window.innerWidth] : [];
	function menuResizeFn() {
		WindowPreSize.push(window.innerWidth);
		if (WindowPreSize.length > 2) { WindowPreSize.shift() }
		if (WindowPreSize.length > 1) {
			if ((WindowPreSize[WindowPreSize.length - 1] < 992) && (WindowPreSize[WindowPreSize.length - 2] >= 992)) {
				// less than 992;
				const newState = {
					toggled: "close"
				}
				setState(newState)
			}

			if ((WindowPreSize[WindowPreSize.length - 1] >= 992) && (WindowPreSize[WindowPreSize.length - 2] < 992)) {
				const theme = getState();
				// greater than 992
				if (theme.dataVerticalStyle == "doublemenu") {
					const doublemenuactive = slidesArrow(".double-menu-active");

					if (doublemenuactive) {
						const newState = {
							toggled: "double-menu-open"
						}
						setState(newState)
					}
					else {
						const newState = {
							toggled: "double-menu-close"
						}
						setState(newState)
					}
				} else {
					setState({ toggled: "" });
				}
			}
		}
	}

	const menuNavRef = useRef(null);
	const mainContainerRef = useRef(null);

	function checkHoriMenu() {
		const menuNav = menuNavRef.current;
		const mainContainer1 = mainContainerRef.current;

		if (menuNav && mainContainer1) {
			const computedStyle = window.getComputedStyle(menuNav);
			const marginLeftValue = Math.ceil(
				Number(computedStyle.marginLeft.split("px")[0])
			);
			const marginRightValue = Math.ceil(
				Number(computedStyle.marginRight.split("px")[0])
			);
			const check = menuNav.scrollWidth - mainContainer1.offsetWidth;

			if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
			} else {
				menuNav.style.marginLeft = "0px";
				menuNav.style.marginRight = "0px";
				menuNav.style.marginInlineStart = "0px";
			}

			const isRtl = document.documentElement.getAttribute("dir") === "rtl";

			if (!isRtl) {
				if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
					if (Math.abs(check) < Math.abs(marginLeftValue)) {
						menuNav.style.marginLeft = -check + "px";
					}
				}
			} else {
				if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
					if (Math.abs(check) < Math.abs(marginRightValue)) {
						menuNav.style.marginRight = -check + "px";
					}
				}
			}
		}
	}

	function switcherArrowFn() {

		// Used to remove is-expanded class and remove class on clicking arrow buttons
		function slideClick() {
			const slide = SelectorAll(".slide");
			const slideMenu = SelectorAll(".slide-menu");

			slide.forEach((element) => {
				if (element.classList.contains("is-expanded")) {
					element.classList.remove("is-expanded");
				}
			});

			slideMenu.forEach((element) => {
				if (element.classList.contains("open")) {
					element.classList.remove("open");
					element.style.display = "none";
				}
			});
		}

		slideClick();
	}

	function slideRight() {
		const menuNav = slidesArrow(".main-menu");
		const mainContainer1 = slidesArrow(".main-sidebar");
		const slideRightButton = slidesArrow("#slide-right");
		const slideLeftButton = slidesArrow("#slide-left");
		const element = slidesArrow(".main-menu > .slide.open");
		const element1 = slidesArrow(".main-menu > .slide.open > ul");
		if (menuNav && mainContainer1) {
			const marginLeftValue = Math.ceil(
				Number(window.getComputedStyle(menuNav).marginInlineStart.split("px")[0])
			);
			const marginRightValue = Math.ceil(
				Number(window.getComputedStyle(menuNav).marginInlineEnd.split("px")[0])
			);
			const check = menuNav.scrollWidth - mainContainer1.offsetWidth;
			let mainContainer1Width = mainContainer1.offsetWidth;

			if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
				if (!(local_varaiable.dir === "rtl")) {
					if (Math.abs(check) > Math.abs(marginLeftValue)) {
						menuNav.style.marginInlineEnd = "0";

						if (!(Math.abs(check) > Math.abs(marginLeftValue) + mainContainer1Width)) {
							mainContainer1Width = Math.abs(check) - Math.abs(marginLeftValue);

							if (slideRightButton) {
								slideRightButton.classList.add("hidden");
							}
						}

						menuNav.style.marginInlineStart =
							(Number(menuNav.style.marginInlineStart.split("px")[0]) -
								Math.abs(mainContainer1Width)) +
							"px";

						if (slideRightButton) {
							slideRightButton.classList.remove("hidden");
						}
					}
				} else {
					if (Math.abs(check) > Math.abs(marginRightValue)) {
						menuNav.style.marginInlineEnd = "0";

						if (!(Math.abs(check) > Math.abs(marginRightValue) + mainContainer1Width)) {
							mainContainer1Width = Math.abs(check) - Math.abs(marginRightValue);
							if (slideRightButton) {
								slideRightButton.classList.add("hidden");
							}
						}

						menuNav.style.marginInlineStart =
							(Number(menuNav.style.marginInlineStart.split("px")[0]) -
								Math.abs(mainContainer1Width)) +
							"px";
						if (slideLeftButton) {
							slideLeftButton.classList.remove("hidden");
						}
					}
				}
			}


			if (element) {
				element.classList.remove("active");
			}
			if (element1) {
				element1.style.display = "none";
			}
		}

		switcherArrowFn();
	}

	function slideLeft() {
		const menuNav = slidesArrow(".main-menu");
		const mainContainer1 = slidesArrow(".main-sidebar");
		const slideRightButton = slidesArrow("#slide-right");
		const slideLeftButton = slidesArrow("#slide-left");
		const element = slidesArrow(".main-menu > .slide.open");
		const element1 = slidesArrow(".main-menu > .slide.open > ul");
		if (menuNav && mainContainer1) {
			const marginLeftValue = Math.ceil(
				Number(window.getComputedStyle(menuNav).marginInlineStart.split("px")[0])
			);
			const marginRightValue = Math.ceil(
				Number(window.getComputedStyle(menuNav).marginInlineEnd.split("px")[0])
			);
			const check = menuNav.scrollWidth - mainContainer1.offsetWidth;
			let mainContainer1Width = mainContainer1.offsetWidth;

			if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
				if (!(local_varaiable.dir === "rtl")) {
					if (Math.abs(check) <= Math.abs(marginLeftValue)) {
						menuNav.style.marginInlineStart = "0px";
					}
				} else {
					if (Math.abs(check) > Math.abs(marginRightValue)) {
						menuNav.style.marginInlineStart = "0";

						if (!(Math.abs(check) > Math.abs(marginRightValue) + mainContainer1Width)) {
							mainContainer1Width = Math.abs(check) - Math.abs(marginRightValue);

							if (slideRightButton) {
								slideRightButton.classList.add("hidden");
							}
						}

						menuNav.style.marginInlineStart =
							(Number(menuNav.style.marginInlineStart.split("px")[0]) -
								Math.abs(mainContainer1Width)) +
							"px";

						if (slideLeftButton) {
							slideLeftButton.classList.remove("hidden");
						}
					}
				}
			}

			if (element) {
				element.classList.remove("active");
			}
			if (element1) {
				element1.style.display = "none";
			}
		}

		switcherArrowFn();
	}

	const level = 0;
	let hasParent = false;
	let hasParentLevel = 0;

	function setSubmenu(event, targetObject, MenuItems = menuitems) {
		const theme = variable;
		if ((window.screen.availWidth <= 992 || theme.dataNavStyle != "icon-hover") && (window.screen.availWidth <= 992 || theme.dataNavStyle != "menu-hover")) {
			if (!event?.ctrlKey) {
				for (const item of MenuItems) {
					if (item === targetObject) {
						item.active = true;
						item.selected = true;
						setMenuAncestorsActive(item);
					} else if (!item.active && !item.selected) {
						item.active = false;
						item.selected = false;
					} else {
						removeActiveOtherMenus(item);
					}
					if (item.children && item.children.length > 0) {
						setSubmenu(event, targetObject, item.children);
					}
				}
			}
		}
		setMenuitems((arr) => [...arr]);
	}
	function getParentObject(obj, childObject) {
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (typeof obj[key] === "object" && JSON.stringify(obj[key]) === JSON.stringify(childObject)) {
					return obj;
				}
				if (typeof obj[key] === "object") {
					const parentObject = getParentObject(obj[key], childObject);
					if (parentObject !== null) {
						return parentObject;
					}
				}
			}
		}
		return null;
	}
	function setMenuAncestorsActive(targetObject) {
		const parent = getParentObject(menuitems, targetObject);
		const theme = getState();
		if (parent) {
			if (hasParentLevel > 2) {
				hasParent = true;
			}
			parent.active = true;
			parent.selected = true;
			hasParentLevel += 1;
			setMenuAncestorsActive(parent);
		}
		else if (!hasParent) {
			if (theme.dataVerticalStyle == "doublemenu") {
				const newState = {
					toggled: "double-menu-close"
				}
				setState(newState)

			}
		}
	}


	function removeActiveOtherMenus(item) {
		if (item) {
			if (Array.isArray(item)) {
				for (const val of item) {
					val.active = false;
					val.selected = false;
				}
			}
			item.active = false;
			item.selected = false;

			if (item.children && item.children.length > 0) {
				removeActiveOtherMenus(item.children);
			}
		}
	}

	function setMenuUsingUrl(currentPath) {

		hasParent = false;
		hasParentLevel = 1;

		const setSubmenuRecursively = (items) => {

			items?.forEach((item) => {
				if (item.path == "") { }
				else if (item.path === currentPath) {
					setSubmenu(null, item);
				}
				setSubmenuRecursively(item.children);
			});
		};
		setSubmenuRecursively(menuitems);
	}
	const [previousUrl, setPreviousUrl] = useState("/");

	useEffect(() => {
		const currentPath = Baselocation.pathname.endsWith("/") ? Baselocation.pathname.slice(0, -1) : Baselocation.pathname;

		if (currentPath !== previousUrl) {
			setMenuUsingUrl(currentPath);
			setPreviousUrl(currentPath);
		}
	}, [Baselocation.pathname]);



	function toggleSidemenu(event, targetObject, MenuItems = menuitems, isChild = false) {
		const theme = getState();
		let element = event.target;

		if (
			(theme.dataNavStyle !== "icon-hover" && theme.dataNavStyle !== "menu-hover") ||
			(window.innerWidth < 992) ||
			(theme.dataNavLayout !== "horizontal" && theme.toggled !== "icon-hover-closed" && theme.toggled !== "menu-hover-closed")
		) {
			for (const item of MenuItems) {
				if (item === targetObject) {
					if (theme.dataVerticalStyle === 'doublemenu') {
						if (isChild) {
							item.active = !item.active;
						} else {
							item.active = true;
						}
					} else {
						item.active = !item.active;
					}

					if (item.active) {
						closeOtherMenus(MenuItems, item);
					}

					setAncestorsActive(MenuItems, item);
				} else if (!item.active && theme.dataVerticalStyle !== 'doublemenu') {
					item.active = false;
				}

				if (item.children && item.children.length > 0) {
					toggleSidemenu(event, targetObject, item.children, true);
				}
			}

			if (targetObject?.children && targetObject.active) {
				if (theme.dataVerticalStyle == 'doublemenu' && theme.toggled != 'double-menu-open') {
					setState({ ...theme, toggled: "open" });
				}
			}

			if (
				element &&
				theme.dataNavLayout === 'horizontal' &&
				(theme.dataNavStyle === 'menu-click' || theme.dataNavStyle === 'icon-click')
			) {
				const listItem = element.closest("li");
				if (listItem) {
					const siblingUL = listItem.querySelector("ul");
					let outterUlWidth = 0;
					let listItemUL = listItem.closest('ul:not(.main-menu)');
					while (listItemUL) {
						listItemUL = listItemUL.parentElement?.closest('ul:not(.main-menu)');
						if (listItemUL) outterUlWidth += listItemUL.clientWidth;
					}

					if (siblingUL) {
						let siblingULRect = listItem.getBoundingClientRect();
						if (theme.dir === 'rtl') {
							targetObject.dirchange =
								(siblingULRect.left - siblingULRect.width - outterUlWidth + 150 < 0 &&
									outterUlWidth < window.innerWidth &&
									outterUlWidth + siblingULRect.width * 2 < window.innerWidth)
									? true : false;
						} else {
							targetObject.dirchange =
								(outterUlWidth + siblingULRect.right + siblingULRect.width + 50 > window.innerWidth &&
									siblingULRect.right >= 0 &&
									outterUlWidth + siblingULRect.width * 2 < window.innerWidth)
									? true : false;
						}
					}
				}
			}
		}

		setMenuitems((arr) => [...arr]);
	}

	function setAncestorsActive(MenuItems, targetObject) {
		const theme = variable;
		const parent = findParent(MenuItems, targetObject);
		if (parent) {
			parent.active = true;
			if (parent.active) {
				const newState = {
					...theme,
					toggled: "double-menu-open"
				}
				setState(newState)
			}

			setAncestorsActive(MenuItems, parent);
		}
	}

	function closeOtherMenus(MENUITEMS, targetObject) {
		for (const item of MENUITEMS) {
			if (item !== targetObject) {
				item.active = false;
				if (item.children && item.children.length > 0) {
					closeOtherMenus(item.children, targetObject);
				}
			}
		}
	}

	function findParent(MENUITEMS, targetObject) {
		for (const item of MENUITEMS) {
			if (item.children && item.children.includes(targetObject)) {
				return item;
			}
			if (item.children && item.children.length > 0) {
				const parent = findParent(item.children, targetObject);
				if (parent) {
					return parent;
				}
			}
		}
		return null;
	}

	function HoverToggleInnerMenuFn(event, item) {
		const theme = getState();;
		let element = event.target;
		if (element && theme.dataNavLayout == "horizontal" && (theme.dataNavStyle == "menu-hover" || theme.dataNavStyle == "icon-hover")) {
			const listItem = element.closest("li");
			if (listItem) {
				const siblingUL = listItem.querySelector("ul");
				let outterUlWidth = 0;
				let listItemUL = listItem.closest("ul:not(.main-menu)");
				while (listItemUL) {
					listItemUL = listItemUL.parentElement.closest("ul:not(.main-menu)");
					if (listItemUL) {
						outterUlWidth += listItemUL.clientWidth;
					}
				}
				if (siblingUL) {
					let siblingULRect = listItem.getBoundingClientRect();
					if (theme.dir == "rtl") {
						if ((siblingULRect.left - siblingULRect.width - outterUlWidth + 150 < 0 && outterUlWidth < window.innerWidth) && (outterUlWidth + siblingULRect.width + siblingULRect.width < window.innerWidth)) {
							item.dirchange = true;
						} else {
							item.dirchange = false;
						}
					} else {
						if ((outterUlWidth + siblingULRect.right + siblingULRect.width + 50 > window.innerWidth && siblingULRect.right >= 0) && (outterUlWidth + siblingULRect.width + siblingULRect.width < window.innerWidth)) {
							item.dirchange = true;
						} else {
							item.dirchange = false;
						}
					}
				}
			}
		}
	}

	const handleClick = (event) => {
		event.preventDefault();
	};
	const toggleTheme = () => {
		const currentTheme = getState();
		const newState = {
			dataThemeMode: currentTheme.dataThemeMode === 'dark' ? 'light' : 'dark',
			dataHeaderStyles: currentTheme.dataThemeMode === 'transparent' ? 'light' : 'transparent',
			dataMenuStyles: currentTheme.dataThemeMode === 'transparent' ? 'light' : 'transparent',
		}
		setState(newState)
		if (newState.dataThemeMode != 'dark') {
			const newState = {
				bodyBg: '',
				lightRgb: '',
				bodyBg2: '',
				inputBorder: '',
				formControlBg: '',
				gray: '',
			}
			setState(newState)
			localStorage.setItem("vyzorlightTheme", "light");
			localStorage.removeItem("vyzordarkTheme");
			localStorage.removeItem("vyzormenu");
			localStorage.removeItem("vyzorheader");
			localStorage.removeItem("bodyBg");
			localStorage.removeItem("bodyBg2");
			localStorage.removeItem("bgImg");
		}
		else {
			localStorage.setItem("vyzordarkTheme", "dark");
			localStorage.removeItem("vyzorlightTheme");
			localStorage.removeItem("vyzormenu");
			localStorage.removeItem("vyzorheader");
			localStorage.removeItem("bodyBg");
			localStorage.removeItem("bodyBg2");
			localStorage.removeItem("inputBorder");
			localStorage.removeItem("lightRgb");
			localStorage.removeItem("formControlBg");
			localStorage.removeItem("gray");
		}
	}
	return (
		<Fragment>
			<div id="responsive-overlay" ref={overlayRef} onClick={() => { menuClose(); }}></div>

			<aside className="app-sidebar sticky" id="sidebar" onMouseOver={Onhover} onMouseLeave={Outhover} >

				<div className="main-sidebar-header">
					<Link to={`/`} className="header-logo">
						<Image src={logo1} alt="logo" className="desktop-logo" />
						<Image src={logo2} alt="logo" className="toggle-dark" />
						<Image src={logo3} alt="logo" className="desktop-dark" />
						<Image src={logo4} alt="logo" className="toggle-logo" />
					</Link>
				</div>

				<SimpleBar className="main-sidebar" id="sidebar-scroll">

					<nav className="main-menu-container nav nav-pills flex-column sub-open">
						<div className="slide-left" id="slide-left" onClick={slideLeft} >
							<svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24"> <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path> </svg>
						</div>
						<ul className="main-menu">

							{menuitems.map((list, index) => (
								<Fragment key={index}>
									<li className={` ${list.menutitle ? "slide__category" : ""} ${list.type === 'link' ? 'slide' : ''} ${list.type === 'sub' ? 'slide has-sub' : ''} ${list.active ? 'open' : ''}  ${list?.selected ? 'active' : ''}  `}>
										{list.menutitle ?
											<span className='category-name'>{list.menutitle}</span>
											:
											""}
										{list.type === "link" ?
											<Link to={list.path} className={`side-menu__item  ${list.selected ? 'active' : ''}`}>
												<span className={`${local_varaiable?.dataVerticalStyle == 'doublemenu' ? '' : 'd-none'}`}>
													<SpkTooltips placement="auto" title={list.title}>
														<div>{list.icon}</div>
													</SpkTooltips>
												</span>
												{local_varaiable.dataVerticalStyle != "doublemenu" ? list.icon : ""}
												<span className="side-menu__label">{list.title} {list.badgetxt ? (<span className={list.class}>{list.badgetxt}</span>
												) : (
													""
												)}
												</span>
											</Link>
											: ""}
										{list.type === "empty" ?
											<Link to="#!" className='side-menu__item' onClick={handleClick} >{list.icon}<span className=""> {list.title} {list.badgetxt ? (
												<span className={list.class}>{list.badgetxt} </span>
											) : (
												""
											)}
											</span>
											</Link>
											: ""}
										{list.children && <Menuloop MenuItems={list} level={level + 1} handleToMenu={toggleSidemenu} HoverToggleInnerMenuFn={HoverToggleInnerMenuFn} />}
									</li>


								</Fragment>
							))}

						</ul>

						<ul className="doublemenu_bottom-menu main-menu mb-0 border-top">
							<li className="slide">
								<Link to="#!" className="side-menu__item layout-setting-doublemenu" onClick={toggleTheme}>
									<span className="light-layout">
										<svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M108.11,28.11A96.09,96.09,0,0,0,227.89,147.89,96,96,0,1,1,108.11,28.11Z" opacity="0.2" /><path d="M108.11,28.11A96.09,96.09,0,0,0,227.89,147.89,96,96,0,1,1,108.11,28.11Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
									</span>
									<span className="dark-layout">
										<svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><circle cx="128" cy="128" r="64" opacity="0.2" /><circle cx="128" cy="128" r="64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="128" y1="32" x2="128" y2="16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="128" y1="240" x2="128" y2="224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="60.12" y1="60.12" x2="48.81" y2="48.81" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="207.19" y1="207.19" x2="195.88" y2="195.88" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="32" y1="128" x2="16" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="240" y1="128" x2="224" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="60.12" y1="195.88" x2="48.81" y2="207.19" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="207.19" y1="48.81" x2="195.88" y2="60.12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
									</span>
								</Link>
							</li>
						</ul>
						<div className="slide-right" id="slide-right" onClick={slideRight}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24"> <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path> </svg>
						</div>
					</nav>
				</SimpleBar>
			</aside>
		</Fragment>
	)
}

export default Sidebar