import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import "../modal-window.css";

export const AuthError = () => {
    const dispatch = useDispatch();
    const returnAuthPage = () => {
        dispatch({type: "UPDATE_PAGE"});
    }
    return (
        <div data-test-id="status-block" className="modal-window">
            <h4 className="modal-window__title">
                Вход не выполнен
            </h4>
            <p className="modal-window__text">
                Что-то пошло не так. Попробуйте ещё раз
            </p>
            <Link to='/auth' onClick={returnAuthPage}
                  className="btn modal-window__link">Повторить</Link>
        </div>
    );
}
