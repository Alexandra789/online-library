import {useRef} from "react";
import "./error-notification.css";
import warningCircle from '../../img/warning-circle.svg';

export const ErrorNotification = ({page}) => {
    const notification = useRef(null);

    const {error} = page;

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
