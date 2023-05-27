import {Link} from "react-router-dom";
import booksListItem from './books-list-item.module.css';
import imgNoneSrc from '../../img/imgNoneSrc.png';
import {Rating} from "../rating";
import {URL_IMAGE} from "../../constants/url";

export const BooksListItem = (props) => {
    const {id, title, authors, issueYear, rating, booking, category, highlightSearchValue} = props;
    const author = [...authors].join(', ');
    let {image} = props;
    let btnClass = `${booksListItem.button} btn btn-booking-book`;
    if (booking) {
        btnClass += ' disabled'
    }

    image = image ? image.url : imgNoneSrc;

    return (
        <li className={booksListItem.item}>
            <Link data-test-id="card" to={`/books/${category}/${id}`}
                  className={booksListItem.link}>
                <div className={booksListItem.book_img}>
                    <img src={image} alt="book img"/>
                </div>
                <div className={booksListItem.info}>
                    <h5 className={booksListItem.title}>{highlightSearchValue(title)}</h5>
                    <p className={booksListItem.description}>{author}, {issueYear}</p>
                    {rating ? <Rating rating={rating} page="booksList"/> :
                        <p className={booksListItem.count}>ещё нет оценок</p>}
                </div>
            </Link>
            <button type="button"
                    className={`${btnClass}`}>{booking ? "Забронирована" : "Забронировать"}</button>
        </li>
    )
}
