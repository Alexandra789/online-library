import "../modal-window.css";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

export const RegistrationErrorAlreadyRegistered = ({setStepRegistration}) => {
    const dispatch = useDispatch();

    return (
        <div data-test-id="status-block" className="modal-window">
            <h4 className="modal-window__title">
                Данные не сохранились
            </h4>
            <p className="modal-window__text">
                Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по
                другому логину или e-mail.
            </p>
            <Link to='/registration'
                  onClick={() => {
                      dispatch({type: "UPDATE_PAGE"});
                      setStepRegistration(1);
                  }}
                  className="btn modal-window__link">Назад к регистрации</Link>
        </div>
    );
}
