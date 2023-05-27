import {useSelector} from "react-redux";
import {useLocation} from "react-router";
import "./forgot-password.css";
import {SendEmailForm} from "../send-email-form";
import {ResetPasswordForm} from "../reset-password-form";
import {Loader} from "../../../components/loader";
import {selectPassword} from "../../../redux/reducers/password/selectors";

export const ForgotPassword = () => {
    const resetPage = useLocation().search;
    localStorage.setItem('code', useLocation().search.split('code=')[1]);
    const password = useSelector(selectPassword);

    return (
        <div className="login">
            <Loader page={password}/>
            <h3 className="login__title">Cleverland</h3>
            {!resetPage && <SendEmailForm/>}
            {resetPage && <ResetPasswordForm/>}
        </div>

    )
}
