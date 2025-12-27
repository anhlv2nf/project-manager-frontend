import React, { useState, useEffect } from 'react';

const Backtotop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <div className={`scrollToTop ${isVisible ? 'd-flex' : 'd-none'}`} onClick={scrollToTop}>
            <span className="arrow"><i className="ri-arrow-up-s-line fs-20"></i></span>
        </div>
    );
};

export default Backtotop;