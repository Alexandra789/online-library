import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import InputMask from 'react-input-mask';
import "./registration.css";
import {
    checkEngLetterLogin,
    checkLogin,
    checkNumber,
    checkNumberAndUpperLetter,
    checkNumberLength, checkNumberLogin,
    checkPassword,
    checkPasswordLength,
    checkPhone,
    checkUpperLetter,
    checkUpperLetterLength,
    highlightError,
    onFocusInput,
    togglePassword, validateEmail,
    validateLogin,
    validatePassword, validatePhone,
    validateRequiredInput,
} from "../validate-form/vaidate-form";
import arrow from "../../../img/arrow-login.svg";
import check from "../../../img/check-circle.svg";
import {
    CHECK_EMAIL,
    CHECK_ENG_LETTER,
    CHECK_NUMBER
} from "../../../constants/regex";
import {RegistrationError} from "../registration-error";
import {RegistrationSuccess} from "../registration-success";
import {selectRegistration} from "../../../redux/reducers/registration/selectors";
import {registerStart} from "../../../redux/reducers/auth/actions";
import {Loader} from "../../../components/loader";
import {RegistrationErrorAlreadyRegistered} from "../registration-error-already-registered";
import {ErrorNotification} from "../../../components/error-notification";

export const Registration = () => {
    const [valueUsername, setValueUsername] = useState('');
    const [valuePassword, setValuePassword] = useState('');
    const [valueFirstName, setValueFirstName] = useState('');
    const [valueLastName, setValueLastName] = useState('');
    const [valuePhone, setValuePhone] = useState('');
    const [valueEmail, setValueEmail] = useState('');
    const [forceErr, setForceErr] = useState(false);
    const [forceErrUsername, setForceErrUsername] = useState(false);

    const [stepRegistration, setStepRegistration] = useState(1);
    const finallyStep = 3;

    const textBtn = ['Следующий шаг', 'Последний шаг', 'Зарегистрироваться'];

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        mode: "all",
    });

    const disabledButton = () => {
        switch (stepRegistration) {
            case 1:
                return errors?.username || errors?.password;
            case 2:
                return errors?.firstName || errors?.lastName;
            case 3:
                return errors?.phone || errors?.email;
            default:
                return false;
        }
    }

    const switchStepRegistration = () => {
        if (Object.keys(errors).length === 0) {
            setStepRegistration(stepRegistration + 1)
        }
    }

    const dispatch = useDispatch();
    const registration = useSelector(selectRegistration);

    const onSubmit = (data) => {
        switchStepRegistration();
        if (stepRegistration === finallyStep) {
            dispatch(registerStart(data));
            reset();
        }
    }

    return (
        <div data-test-id="auth" className="registration">
            <Loader page={registration}/>
            <h3 className="registration__title">Cleverland</h3>
            {!registration.status &&
                <div className="form-wrapper">
                    <h4 className="form__title">Регистрация</h4>
                    <form data-test-id="register-form" className="form" onSubmit={
                        handleSubmit(onSubmit)}>
                        <p className="form__subtitle">{stepRegistration} шаг из {finallyStep}</p>
                        {stepRegistration === 1 &&
                            <div>
                                <div onClick={onFocusInput}
                                     className={forceErrUsername || errors?.username?.type !== 'required' && errors?.username
                                         ? "input-wrapper error" : "input-wrapper"}
                                     role="presentation">
                                    <input type="text" className="form__input" id="usernameInput"
                                           name="username"
                                           value={valueUsername}
                                           {...register("username", {
                                               required: "Поле не может быть пустым",
                                               validate: {
                                                   checkEngLetterAndNumber: v => checkLogin(v) && 'ошибка',
                                                   checkEngLetterAndWithoutNumber: v => checkEngLetterLogin(v) && 'ошибка',
                                                   checkEngWithoutLetterAndWithNumber: v => checkNumberLogin(v) && 'ошибка',
                                                   checkNumber: v => CHECK_NUMBER.test(v) || "цифры",
                                                   checkEngLetter: v => CHECK_ENG_LETTER.test(v) || "латинский алфавит",
                                               },
                                               onBlur: e => {
                                                   setForceErrUsername(e.target.value.length === 0);
                                                   highlightError(e)
                                               },
                                               onChange: e => {
                                                   setForceErrUsername(false);
                                                   setValueUsername(e.target.value)
                                               }
                                           })}
                                    />
                                    <label
                                        className={valueUsername ? "top form__label" : "form__label"}
                                        htmlFor="usernameInput">Придумайте логин для входа</label>
                                    {forceErrUsername &&
                                        <p className="error-text required" data-test-id="hint">
                                            Поле не может быть пустым
                                        </p>}
                                    {errors?.username && !forceErrUsername && errors?.username?.type !== 'required' && validateLogin(errors?.username)}
                                    {errors?.username?.type === 'required' && !forceErrUsername &&
                                        <p className="help-text" data-test-id="hint">
                                            Используйте для логина латинский алфавит и цифры
                                        </p>
                                    }
                                    {!errors?.username && !forceErrUsername &&
                                        <p className="help-text" data-test-id="hint">
                                            Используйте для логина латинский алфавит и цифры
                                        </p>
                                    }
                                </div>

                                <div onClick={onFocusInput}
                                     className={errors?.password ? "input-wrapper mb error" : "input-wrapper mb"}
                                     role="presentation">
                                    <input type="password"
                                           className="form__input" id="passwordInput"
                                           name="password"
                                           value={valuePassword}
                                           {...register("password", {
                                               required: "Поле не может быть пустым",
                                               validate: {
                                                   checkAll: v => checkPassword(v) && 'ошибка',
                                                   checkNumber: v => checkNumber(v) && 'ошибка',
                                                   checkUpperLetter: v => checkUpperLetter(v) && "ошибка",
                                                   checkNumberAndUpperLetter: v => checkNumberAndUpperLetter(v) && "ошибка",
                                                   checkAllLength: v => checkPasswordLength(v) && 'ошибка',
                                                   checkNumberLength: v => checkNumberLength(v) && 'ошибка',
                                                   checkUpperLetterLength: v => checkUpperLetterLength(v) && "ошибка",
                                               },
                                               onBlur: highlightError,
                                               onChange: e => {
                                                   setValuePassword(e.target.value);
                                               }
                                           })}
                                    />
                                    <label
                                        className={valuePassword ? "top form__label" : "form__label"}
                                        htmlFor="passwordInput">Пароль</label>
                                    {!errors?.password &&
                                        <p data-test-id="hint" className="help-text">
                                            Пароль не менее 8 символов, с заглавной буквой и цифрой
                                        </p>
                                    }
                                    {errors?.password ? validatePassword(errors?.password) :
                                        valuePassword ? <img
                                            data-test-id="checkmark"
                                            className="check-icon" src={check}
                                            alt="check icon"/> : ''
                                    }
                                    <button onClick={togglePassword}
                                            type="button" aria-label="btn"
                                            className={valuePassword ? "show-password-btn show" : "show-password-btn"}/>
                                </div>
                            </div>
                        }
                        {stepRegistration === 2 &&
                            <div>
                                <div onClick={onFocusInput}
                                     className={errors?.firstName ? "input-wrapper error" : "input-wrapper"}
                                     role="presentation">
                                    <input
                                        type="text" className="form__input" id="firstNameInput"
                                        name="firstName"
                                        value={valueFirstName}
                                        {...register("firstName", {
                                            required: "Поле не может быть пустым",
                                            onBlur: highlightError,
                                            onChange: e => {
                                                e.target.value = e.target.value.replace(/^\s/, '');
                                                setValueFirstName(e.target.value);
                                            },
                                        })}
                                    />
                                    <label
                                        className={valueFirstName ? "top form__label" : "form__label"}
                                        htmlFor="firstNameInput">Имя</label>
                                    {errors?.firstName ? validateRequiredInput(errors?.firstName) : ''}
                                </div>

                                <div onClick={onFocusInput}
                                     className={errors?.lastName ? "input-wrapper mb error" : "input-wrapper mb"}
                                     role="presentation">
                                    <input type="text"
                                           className="form__input" id="lastNameInput"
                                           name="lastName"
                                           value={valueLastName}
                                           {...register("lastName", {
                                               required: "Поле не может быть пустым",
                                               validate: {
                                                   checkMinLength: v => v.length > 0 || "Поле не может быть пустым",
                                               },
                                               onBlur: highlightError,
                                               onChange: e => {
                                                   e.target.value = e.target.value.replace(/^\s/, '');
                                                   setValueLastName(e.target.value);
                                               },
                                           })}

                                    />
                                    <label
                                        className={valueLastName ? "top form__label" : "form__label"}
                                        htmlFor="lastNameInput">Фамилия</label>
                                    {errors?.lastName ? validateRequiredInput(errors?.lastName) : ''}
                                </div>
                            </div>
                        }
                        {stepRegistration === 3 &&
                            <div>
                                <div onClick={onFocusInput}
                                     className={errors?.phone?.type === "checkPhone" || forceErr ? "input-wrapper error" : "input-wrapper"}
                                     role="presentation">
                                    <InputMask mask="+375 (99) 999-99-99" type="tel"
                                               maskChar="x"
                                               className="form__input" id="phoneInput"
                                               name="phone"
                                               value={valuePhone}
                                               {...register("phone", {
                                                   required: "Поле не может быть пустым",
                                                   validate: {
                                                       checkPhone: v => checkPhone(v) && "В формате +375 (xx) xxx-xx-xx",
                                                   },
                                                   onChange: e => {
                                                       setForceErr(false);
                                                       setValuePhone(e.target.value);
                                                   }
                                               })}
                                    />
                                    <label
                                        className={valuePhone ? "top form__label" : "form__label"}
                                        htmlFor="phoneInput">Телефон</label>
                                    {
                                        forceErr && errors?.phone?.type === "required" &&
                                        <p className="error-text required" data-test-id="hint">
                                            <span>Поле не может быть пустым</span>
                                        </p>
                                    }
                                    {!forceErr && errors?.phone?.type !== "checkPhone" &&
                                        <p className="help-text" data-test-id="hint">
                                            В формате +375 (xx) xxx-xx-xx
                                        </p>
                                    }
                                    {
                                        forceErr && !errors?.phone &&
                                        <p className="error-text required" data-test-id="hint">
                                            В формате +375 (xx) xxx-xx-xx
                                        </p>
                                    }
                                    {
                                        errors?.phone?.type === "checkPhone" && validatePhone(errors?.phone)
                                    }
                                </div>

                                <div onClick={onFocusInput}
                                     className={errors?.email ? "input-wrapper mb error" : "input-wrapper mb"}
                                     role="presentation">
                                    <input type="text"
                                           className="form__input" id="emailInput"
                                           name="email"
                                           value={valueEmail}
                                           {...register("email", {
                                               required: "Поле не может быть пустым",
                                               pattern: {
                                                   value: CHECK_EMAIL,
                                                   message: "Введите корректный e-mail",
                                               },
                                               onBlur: highlightError,
                                               onChange: e => {
                                                   setValueEmail(e.target.value);
                                               }
                                           })}

                                    />
                                    <label
                                        className={valueEmail ? "top form__label" : "form__label"}
                                        htmlFor="email">Email</label>
                                    {
                                        errors?.email && validateEmail(errors?.email)
                                    }
                                </div>
                            </div>
                        }
                        <button
                            className={disabledButton() ? "disabled btn next-step-registration-btn" : "btn next-step-registration-btn"}
                            type="submit"
                            disabled={disabledButton()}
                        >{textBtn[stepRegistration - 1]}
                        </button>
                    </form>
                    <div className="registration-link-wrapper">
                        <p className="text">Есть учётная запись?</p>
                        <NavLink className="registration-link" to='/auth'>Войти <img
                            src={arrow} alt="arrow icon"/></NavLink>
                    </div>
                </div>
            }
            {
                registration.status === 500 &&
                <RegistrationError setStepRegistration={setStepRegistration}/>
            }
            {
                registration.status === 400 &&
                <RegistrationErrorAlreadyRegistered setStepRegistration={setStepRegistration}/>
            }
            {
                registration.status === 200 &&
                <RegistrationSuccess setStepRegistration={setStepRegistration}/>
            }
        </div>
    );
}

