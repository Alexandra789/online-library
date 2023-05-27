import {useLayoutEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {useDispatch} from "react-redux";
import classNames from "classnames";
import '../hamburger-menu/hamburger-menu.css';
import './header.css';
import logo from '../../img/logo.svg';
import avatar from '../../img/avatar.png';
import {HamburgerMenu} from "../hamburger-menu";
import {logOut} from "../../redux/reducers/auth/actions";

export function Header() {
    const dispatch = useDispatch();
    const [accountDropdown, toggleAccountDropdown] = useState(false);
    const name = localStorage.getItem('username');
    const auth = localStorage.getItem('token');

    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
            }

            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }

    const [width, height] = useWindowSize();
    const dropdownInDOM = width <= 952;

    const onLogOut = () => {
        localStorage.removeItem('token');
        dispatch(logOut());
    }

    const onCloseAccountDropDown = () => {
        toggleAccountDropdown(!accountDropdown);
    }

    const path = useLocation().pathname;
    let showHeaderClassName = '';
    if (path === "/auth" || path === "/registration" || path === "/forgot-pass") {
        showHeaderClassName = 'hidden';
    }

    return (
        <section
            className={classNames(["header", showHeaderClassName], {shadow: accountDropdown}, {visible: auth})}>
            <button onClick={onCloseAccountDropDown}
                    className={classNames("close-account-dropdown-btn", {visible: accountDropdown})}
                    type="button" aria-label="btn"/>
            <div className="container">
                <nav className="header__navigation">
                    <Link onClick={()=>toggleAccountDropdown(false)} to="/books/all" className="header__logo">
                        <img src={logo} alt="logo"/>
                    </Link>
                    <HamburgerMenu/>
                    <h1 className="header__title">Библиотека</h1>
                    <div className="header__account">
                        <button type="button" className="header__account-btn"
                                onClick={onCloseAccountDropDown}>
                            <p className="header__account-name">Привет, {name}!</p>
                            <img src={avatar} alt="avatar"/>
                        </button>
                        {!dropdownInDOM &&
                            <div
                                className={classNames("header__dropdown", {open: accountDropdown})}>
                                <Link onClick={onCloseAccountDropDown} to='/books/all'>Профиль</Link>
                                <Link data-test-id="exit-button" onClick={() => {
                                    onLogOut();
                                    toggleAccountDropdown(!accountDropdown)
                                }
                                } to='/auth'>Выход</Link>
                            </div>
                        }
                    </div>
                </nav>
            </div>
        </section>
    )
}
