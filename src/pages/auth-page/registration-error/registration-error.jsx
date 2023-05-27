import "../modal-window.css";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

export const RegistrationError = ({setStepRegistration}) => {
    const dispatch = useDispatch();

    return (
        <div data-test-id="status-block" className="modal-window">
            <h4 className="modal-window__title">
                Данные не сохранились
            </h4>
            <p className="modal-window__text">
                Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз
            </p>
            <Link to='/registration'
                  onClick={() => {
                      dispatch({type: "UPDATE_PAGE"});
                      setStepRegistration(1);
                  }}
                  className="btn modal-window__link">Повторить</Link>
        </div>
    );
}
