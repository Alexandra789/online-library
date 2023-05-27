/* eslint-disable */

import {useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import check from "../../../img/check-circle.svg";
import {recoveryPasswordStart} from "../../../redux/reducers/password/actions";
import {
    checkNumber, checkNumberAndUpperLetter, checkNumberLength,
    checkPassword, checkPasswordLength,
    checkUpperLetter, checkUpperLetterLength, highlightError,
    onFocusInput, togglePassword, validateNewPassword, validatePassword
} from "../validate-form/vaidate-form";
import {selectPassword} from "../../../redux/reducers/password/selectors";
import {ForgotPasswordError} from "../forgot-password-error";
import {ForgotPasswordSuccess} from "../forgot-password-success";

export const ResetPasswordForm = () => {
    const dispatch = useDispatch();
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        mode: "all",
    });

    const [valueNewPassword, setValueNewPassword] = useState('');
    const [valueRepeatPassword, setValueRepeatPassword] = useState('');

    const [forceErr, setForceErr] = useState(true);
    const [forceErrRepeatPass, setForceErrRepeatPass] = useState(false);

    const onSubmit = (data) => {
        data.code = localStorage.getItem('code');
        dispatch(recoveryPasswordStart(data));
        reset();
    }

    const password = useSelector(selectPassword);
    const resetPasswordStatus = password.status;

    const checkMatchPassword = (v) => {
        if (v !== valueNewPassword) return true;
    }

    return (
        <div data-test-id="auth">
            {resetPasswordStatus === 400 || resetPasswordStatus === 404 || resetPasswordStatus === 500 ?
                <ForgotPasswordError/> : ''}
            {resetPasswordStatus === 200 && <ForgotPasswordSuccess/>}
            {!resetPasswordStatus &&
                <div data-test-id="auth" className="form-wrapper forgot-password reset-page">
                    <h4 className="form__title">Восстановление пароля</h4>
                    <form data-test-id="reset-password-form" className="form reset-page-form"
                          onSubmit={handleSubmit(onSubmit)}>
                        <div onClick={onFocusInput}
                             className={errors?.password && !forceErr || errors?.passwordConfirmation?.type === "checkMatchPassword" && forceErrRepeatPass ? "input-wrapper error" : "input-wrapper"}
                             role="presentation">
                            <input type="password"
                                   className="form__input" id="passwordInput"
                                   name="password"
                                   value={valueNewPassword}
                                   {...register("password", {
                                           required: "Поле не может быть пустым",
                                           validate: {
                                               checkAllNewPass: v => checkPassword(v) && 'ошибка',
                                               checkNumber: v => checkNumber(v) && 'ошибка',
                                               checkUpperLetter: v => checkUpperLetter(v) && "ошибка",
                                               checkNumberAndUpperLetter: v => checkNumberAndUpperLetter(v) && "ошибка",
                                               checkAllLength: v => checkPasswordLength(v) && 'ошибка',
                                               checkNumberLength: v => checkNumberLength(v) && 'ошибка',
                                               checkUpperLetterLength: v => checkUpperLetterLength(v) && "ошибка",
                                           },
                                           onBlur: e => {
                                               setForceErr(false);
                                               highlightError(e);
                                           },
                                           onChange: e => {
                                               setForceErr(e.target.value.length === 0);
                                               setValueNewPassword(e.target.value)
                                           }
                                   })
                            }
                            />
                            <label
                                className={valueNewPassword ? "top form__label" : "form__label"}
                                htmlFor="passwordInput">Новый пароль</label>
                            {forceErr || !errors.password ?
                                <p data-test-id="hint" className="help-text">
                                    Пароль не менее 8 символов, с заглавной буквой и цифрой
                                </p> : ''
                            }
                            {errors?.password && !forceErr ? validateNewPassword(errors?.password) :
                                valueNewPassword ?
                                    <img data-test-id="checkmark" className="check-icon" src={check}
                                         alt="check icon"/> : ''
                            }
                            <button onClick={togglePassword}
                                    type="button" aria-label="btn" data-test-id="eye-opened"
                                    className={valueNewPassword ? "show-password-btn show" : "show-password-btn"}/>
                        </div>

                        <div onClick={onFocusInput}
                             className={errors?.passwordConfirmation && forceErrRepeatPass ? "input-wrapper mb error" : "input-wrapper mb"}
                             role="presentation">
                            <input type="password"
                                   className="form__input" id="passwordConfirmationInput"
                                   name="passwordConfirmation"
                                   value={valueRepeatPassword}
                                   {...register("passwordConfirmation", {
                                       required: "Поле не может быть пустым",
                                       validate: {
                                           checkMatchPassword: v => checkMatchPassword(v) && 'Пароли не совпадают',
                                       },
                                       onBlur: e => {
                                           setForceErrRepeatPass(true);
                                       },
                                       onChange: e => {
                                           setForceErrRepeatPass(false);
                                           setValueRepeatPassword(e.target.value);
                                       }
                                   })}

                            />
                            <label
                                className={valueRepeatPassword ? "top form__label" : "form__label"}
                                htmlFor="passwordConfirmationInput">Повторите пароль</label>
                            {errors?.passwordConfirmation && forceErrRepeatPass && validateNewPassword(errors?.passwordConfirmation)}
                            <button onClick={togglePassword}
                                    type="button" aria-label="btn"
                                    className={valueRepeatPassword ? "show-password-btn show" : "show-password-btn"}/>
                            <div/>
                        </div>
                        <button
                            className={errors?.password || forceErrRepeatPass ? "btn recovery-password-btn disabled" : "btn recovery-password-btn"}
                            type="submit"
                            disabled={errors?.password || forceErrRepeatPass}
                        >Сохранить изменения
                        </button>
                    </form>
                    <div className="registration-link-wrapper">
                        <p className="text">После сохранения войдите в библиотеку, используя новый
                            пароль</p>
                    </div>
                </div>
            }
        </div>
    )
}
