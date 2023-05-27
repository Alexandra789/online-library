import Lottie from "react-lottie";
import animationData from "./animationData.json";
import './loader.css';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
}

export function Loader({page}) {
    const {loading, error} = page;

    document.querySelector('body').style.overflow = loading ? 'hidden' : 'initial';

    return (
        <div className={error ? "loader hidden" : loading ? "loader" : "loader hidden"}
             data-test-id='loader'>
            <Lottie options={defaultOptions}/>
        </div>
    )
}
