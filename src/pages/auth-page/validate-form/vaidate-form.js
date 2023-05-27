/* eslint-disable */

import {CHECK_ENG_LETTER, CHECK_NUMBER, CHECK_UPPER_LETTER} from "../../../constants/regex";

export const validateLogin = (err) => (
    <div>
        {err.type === "required" || err.type === "pattern" ?
            <p data-test-id="hint" className="error-text required">
                <span>{err.message}</span></p> : ''}
        {err.type !== "required" && !err.type !== "pattern" ?
            <p data-test-id="hint" className="error-text">
                {
                    err?.type === "checkEngLetterAndWithoutNumber" ? <>Используйте для логина <span
                            className="non-color">латинский алфавит</span> и <span>цифры</span></> :
                        err?.type === "checkEngLetterAndNumber" ? <>Используйте для логина <span>латинский алфавит</span> и <span>цифры</span></> :
                            err.type === "checkEngWithoutLetterAndWithNumber" ? <>Используйте для
                                    логина <span>латинский алфавит</span> и <span
                                        className="non-color">цифры</span></> :
                                err?.type === "checkNumber" ?
                                    <>Используйте для логина <span className="non-color">латинский алфавит</span> и <span>{err?.message}</span></> :
                                    err?.type === "checkEngLetter" ? <>Используйте для
                                        логина <span>{err?.message}</span> и
                                        цифры</> : err?.message

                }
            </p> : ''}
    </div>
)

export const validatePassword = (err) => (
    <div>
        {err.type === "required" &&
            <p data-test-id="hint" className="error-text required">
                <span>{err.message}</span></p>
        }
        {err.type !== "required" &&
            <p data-test-id="hint" className="error-text">
                {
                    err.type === "checkAll" ? <>Пароль <span>не менее 8 символов</span>,
                            с <span>заглавной буквой</span> и <span>цифрой</span></> :
                        err.type === "checkNumberAndUpperLetter" ?
                            <>Пароль <span>не менее 8 символов</span>,
                                <span className="non-color"> с заглавной буквой</span> и <span
                                    className="non-color">цифрой</span></> :
                            err.type === "checkNumber" ?
                                <>Пароль <span>не менее 8 символов</span>,
                                    с <span>заглавной буквой</span> и <span
                                        className="non-color">цифрой</span></> :
                                err.type === "checkUpperLetter" ? <>Пароль <span>не менее 8 символов</span>,
                                        <span
                                            className="non-color"> с заглавной буквой</span> и <span>цифрой</span></> :
                                    err.type === "checkAllLength" ? <>Пароль не менее 8 символов,
                                            с <span>заглавной буквой</span> и <spann>цифрой</spann></> :
                                        err.type === "checkNumberLength" ?
                                            <>Пароль не менее 8 символов,
                                                с <span>заглавной буквой</span> и <span className="non-color">цифрой</span></> :
                                            err.type === "checkUpperLetterLength" ? <>Пароль не
                                                    менее 8
                                                    символов,
                                                    <span
                                                        className="non-color"> с заглавной буквой</span> и <span>цифрой</span></> :
                                                err.type === "required" ?
                                                    <span>{err.message}</span> : err.message
                }
            </p>
        }
    </div>
)

export const validateNewPassword = (err) => (
    <div>
        {err.type === "required" || err.type === "checkMatchPassword" ?
            <p data-test-id="hint" className="error-text required">
                <span>{err.message}</span></p> : ''}
        {err.type !== "required" && err.type !== "checkMatchPassword" &&
            <p data-test-id="hint" className="error-text">
                {
                    err.type === "checkAllNewPass" ? <>Пароль <span>не менее 8 символов</span>,
                            с <span>заглавной буквой</span> и <span>цифрой</span></> :
                        err.type === "checkNumberAndUpperLetter" ?
                            <>Пароль <span>не менее 8 символов</span>,
                                <span className="non-color"> с заглавной буквой</span> и <span
                                    className="non-color">цифрой </span></> :
                            err.type === "checkNumber" ?
                                <>Пароль <span>не менее 8 символов</span>,
                                    с <span>заглавной буквой</span> и цифрой</> :
                                err.type === "checkUpperLetter" ? <>Пароль <span>не менее 8 символов</span>,
                                        <span
                                            className="non-color"> с заглавной буквой</span> и <span>цифрой</span></> :
                                    err.type === "checkAllLength" ? <>Пароль не менее 8 символов,
                                            с <span>заглавной буквой</span> и <span>цифрой</span></> :
                                        err.type === "checkNumberLength" ?
                                            <>Пароль не менее 8 символов,
                                                с <span>заглавной буквой</span> и цифрой</> :
                                            err.type === "checkUpperLetterLength" ? <>Пароль не
                                                    менее 8
                                                    символов,
                                                    с заглавной буквой и <span>цифрой</span></>
                                                : err.message
                }
            </p>
        }</div>
)

export const validateRequiredInput = (err) => (
    <p className="error-text">
        {
            err.type === "checkMinLength" || err.type === "required" ?
                <span data-test-id="hint">{err.message}</span> : err.message
        }
    </p>
)

export const validateEmail = (err) => (
    <p className="error-text">
        {err?.type === "pattern" || err?.type === "required" ?
            <span data-test-id="hint">{err?.message}</span> : ''
        }
    </p>
)

export const validatePhone = (err) => (
    <p className="error-text required">
        {err?.type === "checkPhone" || err?.type === "required" ?
            <span data-test-id="hint">{err?.message}</span> : ''
        }
    </p>
)

export const onFocusInput = (e) => {
    const formInput = e.currentTarget.querySelector('input');
    const errText = e.currentTarget.querySelector('.error-text');
    if (e.target.tagName !== 'P' && e.target.tagName !== 'SPAN') {
        formInput.focus();
        errText?.classList.remove('red');
    }
}

export const togglePassword = (e) => {
    e.currentTarget.classList.toggle('open');
    const input = e.target.closest('div').querySelector('input');
    if (e.currentTarget.classList.contains('open')) {
        input.setAttribute('type', 'text');
    } else {
        input.setAttribute('type', 'password');
    }
}

export const highlightError = (e) => {
    const errText = e.target.parentNode.querySelector('.error-text');
    errText?.classList.add('red');
}

export const checkLogin = (v) => {
    if (!CHECK_NUMBER.test(v) && !CHECK_ENG_LETTER.test(v)) {
        return true;
    }
}

export const checkEngLetterLogin = (v) => {
    if (!CHECK_NUMBER.test(v) && CHECK_ENG_LETTER.test(v)) {
        return true;
    }
}

export const checkNumberLogin = (v) => {
    if (CHECK_NUMBER.test(v) && !CHECK_ENG_LETTER.test(v)) {
        return true;
    }
}

export const checkPassword = (v) => {
    if (v.length < 8 && !CHECK_NUMBER.test(v) && !CHECK_UPPER_LETTER.test(v)) {
        return true;
    }
}

export const checkNumber = (v) => {
    if (v.length < 8 && !CHECK_UPPER_LETTER.test(v) && CHECK_NUMBER.test(v)) {
        return true;
    }
}

export const checkUpperLetter = (v) => {
    if (v.length < 8 && CHECK_UPPER_LETTER.test(v) && !CHECK_NUMBER.test(v)) {
        return true;
    }
}

export const checkNumberAndUpperLetter = (v) => {
    if (v.length < 8 && CHECK_UPPER_LETTER.test(v) && CHECK_NUMBER.test(v)) {
        return true;
    }
}

export const checkNumberLength = (v) => {
    if (v.length >= 8 && !CHECK_UPPER_LETTER.test(v) && CHECK_NUMBER.test(v)) {
        return true;
    }
}

export const checkUpperLetterLength = (v) => {
    if (v.length >= 8 && CHECK_UPPER_LETTER.test(v) && !CHECK_NUMBER.test(v)) {
        return true;
    }
}

export const checkPasswordLength = (v) => {
    if (v.length >= 8 && !CHECK_UPPER_LETTER.test(v) && !CHECK_NUMBER.test(v)) {
        return true;
    }
}

export const checkPhone = (v) => {
    if (v.split(" ")[1] !== '(44)' && v.split(" ")[1] !== '(29)' && v.split(" ")[1] !== '(33)' && v.split(" ")[1] !== '(25)') {
        return true;
    }
}
