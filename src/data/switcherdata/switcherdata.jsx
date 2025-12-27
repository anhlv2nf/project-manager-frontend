import { useState } from 'react';
import { getState, setState } from '../../services/switcherServices';
import { MENUITEMS } from '../../components/vyzor/sidebar/nav';

const switcherSelector = (selector) => {
    if (typeof selector !== 'string' || selector.trim() === '') {
        return null;
    }
    return document.querySelector(selector);
};
const switcherDoucmentIdSelector = (selector) => {
    return document.getElementById(selector);
};

const getDocumentElement = () => {
    return document.documentElement;
};

export const updateTheme = (themeType, clicked) => {
    const newState = {
        dataThemeMode: themeType === "dark" ? "dark" : "light",
        dataHeaderStyles: themeType === "transparent" ? "transparent" : "transparent",
        dataMenuStyles: themeType === "dark" ? "dark" : "transparent",
        bodyBg: "",
        bodyBg2: "",
        inputBorder: "",
        formControlBg: '',
        lightRgb: "",
        gray: ""
    }
    setState(newState)
    localStorage.setItem(`vyzor${themeType}Theme`, themeType);
    localStorage.removeItem(`vyzor${themeType === "dark" ? "transparent" : "dark"}Theme`);

    if (clicked === 'clicked') {
        localStorage.removeItem("bodyBg");
        localStorage.removeItem("bodyBg2");
        localStorage.removeItem("bgImg");
        localStorage.removeItem("vyzorheader");
        localStorage.removeItem("vyzormenu");
        localStorage.removeItem("lightRgb");
        localStorage.removeItem("formControlBg")
    }
}

export const setDirection = (direction) => {
    const newState = { dir: direction };
    setState(newState);
    if (direction === 'rtl') {
        localStorage.setItem("vyzorrtl", 'rtl');
        localStorage.removeItem("vyzorltr");
    } else {
        localStorage.removeItem("vyzorrtl");
    }
};

export function closeMenu() {
    const closeMenudata = (items) => {
        items?.forEach((item) => {
            item.active = false;
            closeMenudata(item.children);
        });
    };
    closeMenudata(MENUITEMS);
}

export const updateLayout = (layoutType) => {
    setTimeout(() => {
        const resetBtn = switcherSelector('#reset-all');
        if (resetBtn) resetBtn.click();
    }, 100);

    const newState = {
        dataNavLayout: layoutType === "horizontal" ? "horizontal" : "vertical",
        dataVerticalStyle: layoutType === "vertical" ? "overlay" : "",
        dataNavStyle: localStorage.vyzornavstyles ? localStorage.vyzornavstyles : "menu-click",
        toggled: layoutType === "vertical" ? "" : undefined
    };

    setState(newState);
    localStorage.setItem('vyzorLayout', layoutType);

    if (layoutType === "vertical") {
        localStorage.removeItem('vyzornavstyles');
    } else {
        localStorage.removeItem("vyzorverticalstyles");
    }

    const Sidebar = switcherSelector('.main-menu');
    if (Sidebar) {
        Sidebar.style.marginInline = '0px';
    }
    closeMenu();
};

export const updateNavStyle = (actionType, toggledState) => {
    const newState = {
        dataNavStyle: actionType,
        toggled: toggledState,
        dataVerticalStyle: "",
    }
    setState(newState);
    localStorage.setItem('vyzornavstyles', actionType);
    localStorage.removeItem('vyzorverticalstyles')

    if (actionType === "icon-click" || actionType === "icon-hover") {
        const Sidebar = switcherSelector('.main-menu');
        if (Sidebar) {
            Sidebar.style.marginInline = '0px';
        }
    }
};

export const DefaultMenu = () => {
    const newState = {
        dataVerticalStyle: "overlay",
        dataNavLayout: "vertical",
        toggled: "",
        dataNavStyle: "",
    }
    setState(newState);
    localStorage.setItem('vyzorverticalstyles', 'default');
    localStorage.removeItem('vyzornavstyles');
};

export const ClosedMenu = () => {
    const newState = {
        dataNavLayout: "vertical",
        dataVerticalStyle: "closed",
        toggled: "close-menu-close",
    }
    setState(newState);
    localStorage.setItem('vyzorverticalstyles', 'closed');
    localStorage.removeItem('vyzornavstyles');
};

const IconTextOpenFn = () => {
    let html = getDocumentElement();
    if (html.getAttribute('data-toggled') === 'icon-text-close') {
        html.setAttribute('data-icon-text', 'open');
    }
}

const IconTextCloseFn = () => {
    let html = getDocumentElement();
    if (html.getAttribute('data-toggled') === 'icon-text-close') {
        html.removeAttribute('data-icon-text');
    }
}

export const IconText = () => {
    const newState = {
        dataNavLayout: "vertical",
        dataVerticalStyle: "icontext",
        toggled: "icon-text-close",
        dataNavStyle: "",
    }
    setState(newState);
    localStorage.setItem('vyzorverticalstyles', 'icontext');
    localStorage.removeItem('vyzornavstyles');
    const MainContent = switcherSelector('.main-content');
    const appSidebar = switcherSelector('.app-sidebar');

    appSidebar?.addEventListener('click', IconTextOpenFn);
    MainContent?.addEventListener('click', IconTextCloseFn);
};

export const iconOverlayFn = () => {
    const newState = {
        dataNavLayout: "vertical",
        dataVerticalStyle: "overlay",
        toggled: "icon-overlay-close",
    };
    setState(newState);
    localStorage.setItem('vyzorverticalstyles', 'overlay');
    localStorage.removeItem('vyzornavstyles');
    const icon = switcherDoucmentIdSelector('switcher-icon-overlay');
    if (icon) icon.checked = true;
};

export const DetachedFn = () => {
    const newState = {
        dataNavLayout: "vertical",
        dataVerticalStyle: "detached",
        toggled: "detached-close",
        dataNavStyle: "",
    }
    setState(newState);
    localStorage.setItem('vyzorverticalstyles', 'detached');
    localStorage.removeItem('vyzornavstyles');
}

export const DoubletFn = () => {
    const newState = {
        dataNavLayout: "vertical",
        dataVerticalStyle: "doublemenu",
        toggled: "double-menu-open",
        dataNavStyle: "",
    }
    setState(newState);
    localStorage.setItem('vyzorverticalstyles', 'doublemenu');
    localStorage.removeItem('vyzornavstyles');

    setTimeout(() => {
        if (!document.querySelector(".main-menu .slide.active ul")) {
            setState({ toggled: "double-menu-close" });
        }
    }, 100);
};

export const setPageStyle = (style) => {
    setState({ dataPageStyle: style });
    localStorage.setItem(`vyzor${style}`, style.charAt(0).toUpperCase() + style.slice(1));
    ['regular', 'classic', 'modern', 'flat'].forEach(item => {
        if (item !== style) localStorage.removeItem(`vyzor${item}`);
    });
};

export const setLayout = (layout) => {
    setState({ dataWidth: layout });
    localStorage.setItem(`vyzor${layout}`, layout.charAt(0).toUpperCase() + layout.slice(1));
    ['default', 'fullwidth', 'boxed'].forEach(item => {
        if (item !== layout) localStorage.removeItem(`vyzor${item}`);
    });
};

export const setMenuPosition = (position) => {
    setState({ dataMenuPosition: position });
    localStorage.setItem(`vyzormenu${position}`, `Menu${position.charAt(0).toUpperCase() + position.slice(1)}`);
    localStorage.removeItem(`vyzormenu${position === 'fixed' ? 'scrollable' : 'fixed'}`);
};

export const setHeaderPosition = (position) => {
    setState({ dataHeaderPosition: position });
    localStorage.setItem(`vyzorheader${position}`, `Header${position.charAt(0).toUpperCase() + position.slice(1)}`);
    localStorage.removeItem(`vyzorheader${position === 'fixed' ? 'scrollable' : 'fixed'}`);
};

export const setMenuStyle = (style) => {
    setState({ dataMenuStyles: style });
    localStorage.setItem('vyzormenu', style);
};

export const setHeaderStyle = (style) => {
    setState({ dataHeaderStyles: style });
    localStorage.setItem('vyzorheader', style);
};

export const setPrimaryColor = (rgb) => {
    setState({ colorPrimaryRgb: rgb });
    localStorage.setItem('primaryRGB', rgb);
};

export const updateBackgroundColor = (bgColor1, bgColor2, clicked) => {
    const newState = {
        bodyBg: bgColor1,
        bodyBg2: bgColor2,
        inputBorder: 'rgba(255,255,255,0.1)',
        lightRgb: bgColor2,
        formControlBg: `rgb(${bgColor2})`,
        dataThemeMode: 'dark',
        dataMenuStyles: 'dark',
        dataHeaderStyles: 'dark',
        gray: 'rgba(255,255,255,0.1)',
    };
    setState(newState);
    localStorage.setItem('bodyBg', bgColor1);
    localStorage.setItem('bodyBg2', bgColor2);
    localStorage.setItem('lightRgb', bgColor2);
    localStorage.setItem('formControlBg', `rgb(${bgColor2})`);
    localStorage.removeItem("vyzorlightTheme");
    localStorage.removeItem("vyzordarkTheme");
    if (clicked === 'clicked') {
        localStorage.removeItem('vyzorheader');
        localStorage.removeItem('vyzormenu');
    }
};

const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    } : null
}

export const ThemePrimaryColor = () => {
    const [color, updateColor] = useState("#FFFFFF");
    const handleInput = (e) => {
        const val = e.target.value;
        let rgb = hexToRgb(val);
        if (rgb) {
            updateColor(val);
            const newState = { colorPrimaryRgb: `${rgb.r} , ${rgb.g} , ${rgb.b}` };
            setState(newState);
            localStorage.setItem("dynamiccolor", `${rgb.r}, ${rgb.g}, ${rgb.b}`);
        }
    };
    return (
        <div className='Themeprimarycolor '>
            <input type="color" onChange={handleInput} value={color} />
        </div>
    );
};

export const ThemeBackgroundColor = () => {
    const [state, updateState] = useState('#FFFFFF');
    const handleInput = (e) => {
        let rgb = hexToRgb(e.target.value);
        if (rgb) {
            updateState(e.target.value);
            const newState = {
                bodyBg: `${rgb.r + 14}, ${rgb.g + 14}, ${rgb.b + 14}`,
                bodyBg2: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
                inputBorder: "rgba(255,255,255,0.1)",
                lightRgb: `${rgb.r + 5} ${rgb.g + 5} ${rgb.b + 5}`,
                formControlBg: `rgb(${rgb.r} ${rgb.g} ${rgb.b})`,
                dataThemeMode: "dark",
                dataHeaderStyles: "dark",
                dataMenuStyles: "dark",
                gray: `rgb(${rgb.r} ${rgb.g} ${rgb.b})`
            }
            setState(newState);
            localStorage.setItem("bodyBg", `${rgb.r}, ${rgb.g}, ${rgb.b}`);
            localStorage.setItem("bodyBg2", `${rgb.r + 14}, ${rgb.g + 14}, ${rgb.b + 14}`);
            localStorage.setItem('lightRgb', `${rgb.r + 5} ${rgb.g + 5} ${rgb.b + 5}`)
            localStorage.setItem('formControlBg', `rgb(${rgb.r} ${rgb.g} ${rgb.b})`)
            localStorage.removeItem("vyzormenu");
            localStorage.removeItem("vyzorheader");
            localStorage.removeItem("vyzorlightTheme");
            localStorage.removeItem("vyzordarkTheme");
        }
    }
    return (
        <div className="Themebackgroundcolor ">
            <input type="color" onChange={handleInput} value={state} />
        </div>
    )
}

export const setBgImage = (bgImageNumber) => {
    const bgImgKey = `bgimg${bgImageNumber}`;
    setState({ bgImg: bgImgKey });
    for (let i = 1; i <= 5; i++) {
        if (i === bgImageNumber) localStorage.setItem(`bgimage${i}`, bgImgKey);
        else localStorage.removeItem(`bgimage${i}`);
    }
};

export const Reset = () => {
    const newState = {
        lang: "en", dir: "ltr", dataThemeMode: "light", dataMenuStyles: "transparent",
        dataNavLayout: "vertical", dataHeaderStyles: "transparent", dataVerticalStyle: "doublemenu",
        dataNavStyle: "", horStyle: "", dataPageStyle: "flat", dataWidth: "fullwidth",
        dataMenuPosition: "fixed", dataHeaderPosition: "fixed", iconOverlay: "",
        colorPrimaryRgb: "", bodyBg: "", bodyBg2: "", inputBorder: "", lightRgb: "",
        formControlBg: "", gray: "", bgImg: "", loader: "disable", iconText: "",
        body: { class: "" }
    };
    setState(newState);
    localStorage.clear()
    const icon = switcherDoucmentIdSelector('switcher-default-menu');
    if (icon) icon.checked = true;
};

export const LocalStorageBackup = (setpageloading) => {
    if (localStorage.vyzordarkTheme) updateTheme('dark', true);
    if (localStorage.vyzorlightTheme) updateTheme('light', true);
    if (localStorage.vyzorrtl) setDirection('rtl');
    if (localStorage.vyzorregular) setPageStyle('regular');
    if (localStorage.vyzorclassic) setPageStyle('classic');
    if (localStorage.vyzormodern) setPageStyle('modern');
    if (localStorage.vyzorflat) setPageStyle('flat');
    if (localStorage.vyzorfullwidth) setLayout('fullwidth');
    if (localStorage.vyzordefault) setLayout('default');
    if (localStorage.vyzorboxed) setLayout('boxed');
    if (localStorage.vyzormenufixed) setMenuPosition('fixed');
    if (localStorage.vyzormenuscrollable) setMenuPosition('scrollable');
    if (localStorage.vyzorheaderfixed) setHeaderPosition('fixed');
    if (localStorage.vyzorheaderscrollable) setHeaderPosition('scrollable');
    if (localStorage.bgimage1) setBgImage(1);
    if (localStorage.bgimage2) setBgImage(2);
    if (localStorage.bgimage3) setBgImage(3);
    if (localStorage.bgimage4) setBgImage(4);
    if (localStorage.bgimage5) setBgImage(5);
    if (localStorage.vyzornavstyles === "menu-click") updateNavStyle('menu-click', 'menu-click-closed');
    if (localStorage.vyzornavstyles === "menu-hover") updateNavStyle('menu-hover', 'menu-hover-closed');
    if (localStorage.vyzornavstyles === "icon-click") updateNavStyle('icon-click', 'icon-click-closed');
    if (localStorage.vyzornavstyles === "icon-hover") updateNavStyle('icon-hover', 'icon-hover-closed');
    if (localStorage.vyzorLayout == 'horizontal') updateLayout('horizontal');

    if (localStorage.vyzormenu) setMenuStyle(localStorage.vyzormenu);
    if (localStorage.vyzorheader) setHeaderStyle(localStorage.vyzorheader);
    if (localStorage.primaryRGB) setPrimaryColor(localStorage.primaryRGB);

    if (localStorage.bodyBg) {
        updateBackgroundColor(localStorage.bodyBg, localStorage.bodyBg2, true);
    }

    if (localStorage.dynamiccolor) {
        setState({ colorPrimaryRgb: localStorage.dynamiccolor });
    }

    if (localStorage.vyzorverticalstyles) {
        let verticalstyles = localStorage.getItem('vyzorverticalstyles');
        switch (verticalstyles) {
            case 'default': DefaultMenu(); break;
            case 'closed': ClosedMenu(); break;
            case 'icontext': IconText(); break;
            case 'doublemenu': DoubletFn(); break;
            case 'detached': DetachedFn(); break;
            case 'overlay': iconOverlayFn(); break;
        }
    }
};
