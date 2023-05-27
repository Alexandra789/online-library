import "../modal-window.css";
import {Link} from "react-router-dom";

export const ForgotPasswordSuccess = () => (
    <div data-test-id="status-block" className="modal-window">
        <h4 className="modal-window__title">
            Новые данные сохранены
        </h4>
        <p className="modal-window__text">
            Зайдите в личный кабинет, используя свои логин и новый пароль
        </p>
        <button type="button" className="modal-window__btn">
            <Link to='/auth' className="btn modal-window__link">Вход</Link>
        </button>
    </div>
);

