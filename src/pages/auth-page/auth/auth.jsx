import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import './auth.css';

import arrow from "../../../img/arrow-login.svg";
import {
    onFocusInput,
    togglePassword,
    validateLogin, validatePassword,
} from "../validate-form/vaidate-form";
import {AuthError} from "../auth-error";
import {loginStart} from "../../../redux/reducers/auth/actions";
import {selectAuth} from "../../../redux/reducers/auth/selectors";
import {Loader} from "../../../components/loader";
import {ErrorNotification} from "../../../components/error-notification";

export const Auth = () => {
    const [isEyePassword, toggleEyePassword] = useState(false);
    const [valueIdentifier, setValueIdentifier] = useState('');
    const [valuePassword, setValuePassword] = useState('');
    const [isValidAuth, setIsValidAuth] = useState(false);
    const [forceErrUsername, setForceErrUsername] = useState(false);
    const [forceErrPassword, setForceErrPassword] = useState(false);

    const {
        register, handleSubmit,
        formState: {errors}
    } = useForm({
        mode: "all"
    });

    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);

    const onSubmit = (data) => {
        dispatch(loginStart(data));
    }

    const statusResponse = auth?.status;

    return (
        <div data-test-id="auth" className="login-page">
            <ErrorNotification page={auth}/>
            {!isValidAuth && <Loader page={auth}/>}
            {!isValidAuth && statusResponse === 400 || statusResponse === 429 || !statusResponse ?
                <div className="login">
                    <h3 className="login__title">Cleverland</h3>
                    <div className="form-wrapper">
                        <h4 className="form__title">Вход в личный кабинет</h4>
                        <form data-test-id="auth-form" className="form"
                              onSubmit={handleSubmit(onSubmit)}>
                            <div onClick={onFocusInput}
                                 className={statusResponse === 400 || errors?.identifier || forceErrUsername ? "input-wrapper error" : "input-wrapper"}
                                 role="presentation">
                                <input className="form__input" id="identifierInput"
                                       name="identifier"
                                       value={valueIdentifier}
                                       {...register("identifier", {
                                           required: "Поле не может быть пустым",
                                           onChange: e => {
                                               setForceErrUsername(false);
                                               setValueIdentifier(e.target.value);
                                           }
                                       })}
                                       onBlur={e => {
                                           setForceErrUsername(e.target.value.length === 0);
                                       }}
                                />
                                <label
                                    className={valueIdentifier ? "top form__label" : "form__label"}
                                    htmlFor="identifierInput">Логин</label>
                                {forceErrUsername &&
                                    <p className="error-text required" data-test-id="hint"><span>Поле не может быть пустым</span>
                                    </p>
                                }
                                {errors?.identifier && !forceErrUsername && validateLogin(errors?.identifier)}
                            </div>
                            <div onClick={onFocusInput}
                                 className={statusResponse === 400 || errors?.password || forceErrPassword ? "input-wrapper mb error" : "input-wrapper mb"}
                                 role="presentation">
                                <input type="password"
                                       className="form__input" id="passwordInput"
                                       name="password"
                                       value={valuePassword}
                                       {...register("password", {
                                           required: "Поле не может быть пустым",
                                           onChange: e => {
                                               setForceErrPassword(false);
                                               setValuePassword(e.target.value);
                                           }
                                       })}
                                       onBlur={e => {
                                           setForceErrPassword(e.target.value.length === 0);
                                       }}
                                />
                                <label
                                    className={valuePassword ? "top form__label" : "form__label"}
                                    htmlFor="passwordInput">Пароль</label>
                                {forceErrPassword &&
                                    <p className="error-text required" data-test-id="hint"><span>Поле не может быть пустым</span>
                                    </p>
                                }
                                {errors?.password && !forceErrPassword && validatePassword(errors?.password)}
                                {valuePassword &&
                                    <button onClick={(e) => {
                                        toggleEyePassword(!isEyePassword);
                                        togglePassword(e)
                                    }}
                                            type="button"
                                            aria-label="btn"
                                            data-test-id={isEyePassword ? "eye-opened" : "eye-closed"}
                                            className={valuePassword ? "show-password-btn show" : "show-password-btn"}/>
                                }
                            </div>
                            {statusResponse === 400 ?
                                <div className="login-page-error">
                                    <p className="error-text">
                                            <span
                                                data-test-id="hint">Неверный логин или пароль!</span>
                                    </p>
                                    <NavLink to='forgot-pass'
                                             className="recovery-link-btn">Восстановить?</NavLink>
                                </div>
                                :
                                <NavLink to='/forgot-pass' onClick={() => {
                                    dispatch({type: "UPDATE_PAGE"})
                                }
                                } className="form__assistive-text">Забыли
                                    логин
                                    или
                                    пароль?</NavLink>
                            }

                            <button
                                className={errors?.identifier || errors?.password ? "btn login-btn disabled" : "btn login-btn"}
                                type="submit"
                                disabled={errors?.identifier || errors?.password}
                            >Вход
                            </button>
                        </form>
                        <div className="registration-link-wrapper">
                            <p className="text">Нет учётной записи?</p>
                            <NavLink className="registration-link"
                                     to='/registration'>Регистрация <img
                                src={arrow} alt="arrow icon"/></NavLink>
                        </div>
                    </div>
                </div> : ''
            }
            {
                statusResponse === 500 &&
                <AuthError setIsValidAuth={setIsValidAuth}/>
            }

        </div>
    );
}
