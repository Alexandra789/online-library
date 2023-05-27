import {useLocation} from "react-router";
import footer from './footer.module.css';
import fb from "../../img/social-icons/facebook.svg";
import inst from "../../img/social-icons/instagram.svg";
import vk from "../../img/social-icons/vk.svg";
import linkedin from "../../img/social-icons/linkedin.svg";

export function Footer() {
    const socialMedia = [
        {
            id: 1,
            link: "https://ru-ru.facebook.com/clevertec.ru/",
            imgSrc: fb,
            alt: "facebook icon"
        },
        {
            id: 2,
            link: "https://www.instagram.com/clevertec.ru/",
            imgSrc: inst,
            alt: "instagram icon"
        },
        {
            id: 3,
            link: "https://vk.com/clevertec",
            imgSrc: vk,
            alt: "vk icon"
        },
        {
            id: 4,
            link: "https://www.linkedin.com/company/clevertec-ru/",
            imgSrc: linkedin,
            alt: "linkedin icon"
        },
    ];

    const auth = localStorage.getItem('token');

    const elements = socialMedia.map(item => (
        <a rel="noopener noreferrer" href={item.link} key={item.id} target="_blank">
            <img src={item.imgSrc} alt={item.alt}/>
        </a>
    ))

    const path = useLocation().pathname;
    let showHeaderClassName = '';
    if (path === "/auth" || path === "/registration" || path === "/forgot-pass") {
        showHeaderClassName = 'hidden';
    }

    return (
        <div className={`${showHeaderClassName} ${auth && "visible"} container footer-container`}>
            <footer className={footer.footer}>
                <p className={footer.text}>© 2020-2023 Cleverland. Все права защищены.</p>
                <div className={footer.icons}>
                    {elements}
                </div>
            </footer>
        </div>
    )
}
