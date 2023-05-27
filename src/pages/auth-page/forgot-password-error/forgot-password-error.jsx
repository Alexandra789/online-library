import "../modal-window.css";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

export const ForgotPasswordError = () => {
    const dispatch = useDispatch();

    const returnForgotPassPage = () => {
        dispatch({type: "UPDATE_PAGE"});
    }

    return (
        <div data-test-id="status-block" className="modal-window">
            <h4 className="modal-window__title">
                Данные не сохранились
            </h4>
            <p className="modal-window__text">
                Что-то пошло не так. Попробуйте ещё раз
            </p>
            <Link to='/forgot-pass' onClick={returnForgotPassPage}
                  className="btn modal-window__link">Повторить</Link>
        </div>
    );
}
