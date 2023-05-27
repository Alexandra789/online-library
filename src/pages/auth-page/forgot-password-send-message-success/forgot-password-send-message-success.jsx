import "../modal-window.css";

export const ForgotPasswordSendMessageSuccess = () => (
    <div data-test-id="status-block" className="modal-window">
        <h4 className="modal-window__title">
            Письмо выслано
        </h4>
        <p className="modal-window__text">
            Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля
        </p>
    </div>
);

