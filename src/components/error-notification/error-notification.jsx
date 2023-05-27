import {useRef} from "react";
import {useSelector} from "react-redux";
import "./error-notification.css";
import warningCircle from '../../img/warning-circle.svg';
import {selectBooks} from "../../redux/reducers/books/selectors";
import {selectCategories} from "../../redux/reducers/categores/selectors";
import {selectBookDetails} from "../../redux/reducers/book-details/selectors";
import {selectAuth} from "../../redux/reducers/auth/selectors";
import {selectRegistration} from "../../redux/reducers/registration/selectors";
import {selectPassword} from "../../redux/reducers/password/selectors";

export const ErrorNotification = ({page}) => {
    const notification = useRef(null);

    const books = useSelector(selectBooks);
    const book = useSelector(selectBookDetails);
    const categories = useSelector(selectCategories);
    const auth = useSelector(selectAuth);
    const registration = useSelector(selectRegistration);
    const password = useSelector(selectPassword);

    const {loading, error} = page;

    // const error = books.error || categories.error || book.error || auth.error || registration.error || password.error;

    const onCloseNotification = () => {
        notification.current.style.display = 'none';
    }

    return (
        <div className={error ? "error-notification" : "error-notification hidden"}
             ref={notification} data-test-id="error">
            <div className="container">
                <div className="error-notification-wrapper">
                    <p className="error-text">
                        <img className="warning-icon" src={warningCircle} alt="error img"/>
                        Что-то пошло не так. Обновите страницу через некоторое время.
                    </p>
                    <button aria-label="btn" onClick={onCloseNotification} type="button"
                            className="close-error-notification-btn"/>
                </div>
            </div>
        </div>
    )
}
