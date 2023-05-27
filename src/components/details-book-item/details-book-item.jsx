/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import {useState} from "react";
import classNames from "classnames";

import detailsBookItem from './details-book-item.module.css';

import {Rating} from "../rating";
import {Slider} from "../slider";

import arrow from '../../img/arrow-black.svg';
import imgNoneSrc from '../../img/imgNoneSrc.png';
import {RatingModalWindow} from "../rating-modal-window";

export const DetailsBookItem = ({book}) => {
    const MONTHS = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
    const {
        title, issueYear, authors,
        rating, order, description,
        comments, publish, pages, cover, weight, format, producer, ISBN, categories,
    } = book ? book : '';

    const author = authors ? [...authors].join(', ') : '';
    const category = categories ? [...categories].join(', ') : '';

    const dirDetailedDateTitle = [
        {id: 1, subtitle: 'Издательство', info: publish},
        {id: 2, subtitle: 'Год издания', info: issueYear},
        {id: 3, subtitle: 'Страниц', info: pages},
        {id: 4, subtitle: 'Переплёт', info: cover},
        {id: 5, subtitle: 'Формат', info: format},
        {id: 6, subtitle: 'Жанр', info: category},
        {id: 7, subtitle: 'Вес', info: weight},
        {id: 8, subtitle: 'ISBN', info: ISBN},
        {id: 9, subtitle: 'Изготовитель', info: producer},
    ]
    const [isReviewsOpen, toggleReviews] = useState(false);

    const toggleReviewsMode = () => {
        toggleReviews(!isReviewsOpen);
    }

    const commentsArray = [];
    comments?.forEach(item => {
        const date = new Date(item.createdAt);
        const day = date.getDate();
        const month = MONTHS[date.getMonth()];
        const year = date.getFullYear();
        const resultDate = `${day} ${month} ${year}`;
        const name = `${item.user.firstName}  ${item.user.lastName}`;
        const avatar = item.user.avatarUrl ? item.user.avatarUrl : imgNoneSrc;

        commentsArray.push(
            <div key={item.id} className={detailsBookItem.block}>
                <div className={detailsBookItem.author}>
                    <img className={detailsBookItem.author_img} src={avatar}
                         alt="img author review"/>
                    <div className={detailsBookItem.wrapper}>
                        <p>{name}</p>
                        <p>{resultDate}</p>
                    </div>
                </div>
                <Rating rating={rating} page="detailsPage"/>
                {item.text ?
                    <p className={detailsBookItem.text}>{item.text}</p>
                    : ''
                }
            </div>)
    })

    const reviewsBlock = commentsArray.map(item => item);

    const detailedDateElement = dirDetailedDateTitle.map(item =>
        <div key={item.id} className={detailsBookItem.block}>
            <p className={detailsBookItem.subtitle}>{item.subtitle}</p>
            <p className={detailsBookItem.text}>{item.info}</p>
        </div>
    )

    return (
        <div className={detailsBookItem.card}>
            <div className={detailsBookItem.main_info}>
                <div className={detailsBookItem.img}>
                    <Slider images={book?.images}/>
                </div>
                <div className={detailsBookItem.wrapper}>
                    <h3 data-test-id='book-title' className={detailsBookItem.title}>{title}</h3>
                    <h5 className={detailsBookItem.author}>{author}, {issueYear}</h5>
                    <button type="button"
                            className={`${detailsBookItem.button} ${order ? "disabled" : ""} btn btn-order-book`}>{order ? "Забронирована" : "Забронировать"}</button>
                </div>
                <div className={detailsBookItem.about_book}>
                    <h5 className={`${detailsBookItem.title} ${detailsBookItem.line}`}>О книге</h5>
                    <p className={detailsBookItem.description}>
                        {description}
                    </p>
                </div>
            </div>
            <div className={`${rating ? '' : detailsBookItem.empty} ${detailsBookItem.rating}`}>
                <h5 className={`${detailsBookItem.title} ${detailsBookItem.line}`}>Рейтинг</h5>
                <div className={detailsBookItem.wrapper}>
                    <Rating rating={rating} page='detailsPage'/>
                    {rating ? <h5 className={detailsBookItem.count}>{rating}</h5> :
                        <p>ещё нет оценок</p>}

                </div>
            </div>
            <div className={detailsBookItem.detailed_info}>
                <h5 className={`${detailsBookItem.title} ${detailsBookItem.line}`}>Подробная
                    информация</h5>
                <div className={detailsBookItem.blocks}>
                    {detailedDateElement}
                </div>
            </div>
            {comments?.length > 0 ? <div className={detailsBookItem.reviews}>
                    <h5 onClick={toggleReviewsMode} data-test-id='button-hide-reviews'
                        className={`${detailsBookItem.title} ${detailsBookItem.line} ${isReviewsOpen ? detailsBookItem.active : ''}`}>Отзывы <span>{comments.length}</span>
                        <img src={arrow} alt="arrow"/>
                    </h5>
                    <div className={classNames("reviews-wrapper", {open: isReviewsOpen})}>
                        {reviewsBlock}
                    </div>
                </div> :
                <h5 className={`${detailsBookItem.title}`}>Отзывы <span>{comments?.length}</span>
                </h5>
            }

            <button data-test-id='button-rating' type="button"
                    className={`${detailsBookItem.button} btn ${detailsBookItem.button_review}`}>Оценить
                книгу
            </button>
        </div>
    )
}
