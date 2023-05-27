import React, {useState} from "react";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import classNames from 'classnames';
import {Categories} from "../categories";

import './hamburger-menu.css';

export function HamburgerMenu() {
    const [isMenuOpen, toggleMenu] = useState(false);
    const [isMobileCategoriesOpen, mobileToggleCategories] = useState(() => window.innerWidth <= 952);

    const selectCnt = state => state.count;

    const count = useSelector(selectCnt);
    const mobileArrayCount = count.count['Бизнес'] ? count.count : '';

    const toggleMenuMode = () => {
        toggleMenu(!isMenuOpen);
        document.querySelector('body').style.overflow = isMenuOpen ? 'initial' : 'hidden';
    }

    const resizeHandler = () => {
        if (window.innerWidth > 952) {
            toggleMenu(false);
            document.querySelector('body').style.overflow = 'initial';
        }
        if (window.location.hash.split('/').pop() === 'terms' || window.location.hash.split('/').pop() === 'contract') {
            mobileToggleCategories(false);
        } else {
            mobileToggleCategories(true);
        }
    }

    React.useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        resizeHandler();
        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    return (
        <>
            <button type="button" aria-label="content" onClick={() => {
                toggleMenuMode();
                toggleMenu(false);
            }}
                    className={classNames("content", {visible: isMenuOpen})}
            />
            <div className="hamburger-menu">
                <button data-test-id="button-burger" type="button" onClick={(e) => {
                    toggleMenuMode(e)
                }} className={classNames("burger-menu-btn", {visible: isMenuOpen})}>
                    <span className="line line1"/>
                    <span className="line line2"/>
                    <span className="line line3"/>
                </button>
                <div data-test-id='burger-navigation'
                     className={classNames("menu", {show: isMenuOpen}, {active: isMobileCategoriesOpen})}>
                    <Categories
                        mobileArrayCount={mobileArrayCount}
                        isMobileCategoriesOpen={isMobileCategoriesOpen}
                        mobileToggleCategories={mobileToggleCategories} burgerMenu={true}
                        toggleMenuMode={toggleMenuMode}/>
                    <div className="account-navigation">
                        <NavLink onClick={
                            () => {
                                mobileToggleCategories(false);
                                toggleMenuMode()
                            }} to="/profile" className="section categories-link">
                            <p className="categories-title">Профиль</p>
                        </NavLink>
                        {isMenuOpen &&
                            <NavLink onClick={() => {
                                mobileToggleCategories(false);
                                toggleMenuMode()
                                localStorage.removeItem('token');
                            }} to="/auth" data-test-id="exit-button"
                                     className="section categories-link">
                                <p className="categories-title">Выход</p>
                            </NavLink>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
