import {useState} from "react";
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import "../forgot-password/forgot-password.css";
import arrow from "../../../img/arrow-login.svg";
import arrowLeft from "../../../img/arrow-left.svg";
import {sendMessageStart} from "../../../redux/reducers/password/actions";
import {onFocusInput, validateEmail, validateLogin} from "../validate-form/vaidate-form";
import {CHECK_EMAIL} from "../../../constants/regex";
import {selectPassword} from "../../../redux/reducers/password/selectors";
import {ForgotPasswordSendMessageSuccess} from "../forgot-password-send-message-success";

export const SendEmailForm = () => {
    const dispatch = useDispatch();

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        mode: "all",
    });

    const [valueEmail, setValueEmail] = useState('');

    const onSubmit = (data) => {
        dispatch(sendMessageStart(data));
        reset();
    }

    const password = useSelector(selectPassword);
    const sendMessageStatus = password.status;
    const errorMessage = password?.error?.message;

    return (
        <div data-test-id="auth">
            {sendMessageStatus === 200 && <ForgotPasswordSendMessageSuccess/>}
            {!sendMessageStatus && <div className="form-wrapper forgot-password">
                <div className="forgot-password__navigation">
                    <Link to='/auth'>
                        <img src={arrowLeft} alt="arrow icon"/>
                        <p>вход в личный кабинет</p>
                    </Link>
                </div>
                <h4 className="form__title">Восстановление пароля</h4>
                <form data-test-id="send-email-form" className="form"
                      onSubmit={handleSubmit(onSubmit)}>
                    <div onClick={onFocusInput}
                         className={errors?.email ? "input-wrapper error" : "input-wrapper"}
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
                                   onChange: e => {
                                       setValueEmail(e.target.value);
                                   }
                               })}
                        />
                        <label
                            className={valueEmail ? "top form__label" : "form__label"}
                            htmlFor="email">Email</label>
                        {errors?.email && validateEmail(errors?.email)}
                        {!errors?.email &&
                            <p className={errorMessage && valueEmail && !errors?.email ? "error-text" : "error-text hidden"}>
                                <span data-test-id="hint">Что-то пошло не так</span>
                            </p>
                        }
                        <p className="help-text">
                            На это email будет отправлено письмо с инструкциями по
                            восстановлению
                            пароля
                        </p>
                    </div>
                    <button
                        className={errors?.email ? "btn recovery-password-btn disabled" : "btn recovery-password-btn"}
                        type="submit"
                        disabled={errors?.email}
                    >Восстановить
                    </button>
                </form>
                <div className="registration-link-wrapper">
                    <p className="text">Нет учётной записи?</p>
                    <NavLink className="registration-link"
                             to='/registration'>Регистрация <img
                        src={arrow} alt="arrow icon"/></NavLink>
                </div>
            </div>}
        </div>
    )
}
