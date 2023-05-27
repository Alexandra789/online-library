import "../modal-window.css";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

export const RegistrationSuccess = ({setStepRegistration}) => {
    const dispatch = useDispatch();

    return (
        <div data-test-id="status-block" className="modal-window">
            <h4 className="modal-window__title">
                Регистрация успешна
            </h4>
            <p className="modal-window__text">
                Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль
            </p>
            <button type="button" className="modal-window__btn"><Link to='/auth' onClick={() => {
                dispatch({type: "UPDATE_PAGE"});
                setStepRegistration(1);
            }} className="btn modal-window__link">
                Вход
            </Link></button>
        </div>
    );
}

