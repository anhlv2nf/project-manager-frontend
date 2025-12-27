import { Fragment, useEffect, useRef, useState } from "react"
import { Outlet } from "react-router-dom"
import { Initialload } from "../../context/Initialload"
import Backtotop from "./backtotop/backtotop"
import Footer from "./footer/footer"
import Sidebar from "./sidebar/sidebar"
import Header from "./header/header"
import Switcher from "./switcher/switcher"
import { data$, getState } from "../../services/switcherServices"

function VyzorLayout() {
    const [lateLoad, setlateLoad] = useState(false);
    const progressRef = useRef(null);
    const [pageloading, setpageloading] = useState(false)

    useEffect(() => {
        setlateLoad(true);
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;

            if (progressRef.current) {
                progressRef.current.style.width = `${scrollPercent}%`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    let [variable, setVariable] = useState(getState());
    useEffect(() => {
        const subscription = data$.subscribe((e) => {
            setVariable(e);
        });

        return () => subscription.unsubscribe();
    }, []);

    let containerclass = variable.dataPageStyle === 'flat' ? "main-body-container" : ""

    return (
        <Fragment>
            <Initialload.Provider value={{ pageloading, setpageloading }}>
                <div style={{ display: `${lateLoad ? "block" : "none"}` }}>
                    <div ref={progressRef} className="progress-top-bar"></div>
                    <Switcher />
                    <div className='page'>
                        <Header />
                        <Sidebar />
                        <div className='main-content app-content'>
                            <div className={`container-fluid page-container ${containerclass}`}>
                                <Outlet />
                            </div>
                        </div>
                        <Footer />
                    </div>
                    <Backtotop />
                </div>
            </Initialload.Provider>
        </Fragment>
    )
}

export default VyzorLayout
