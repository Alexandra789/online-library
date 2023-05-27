import star from "../../img/icon_star.svg";
import notActiveStar from "../../img/not_active_star.svg";
import detailsBookItem from '../details-book-item/details-book-item.module.css';
import booksListItem from '../books-list-item/books-list-item.module.css';

export const Rating = ({rating, page}) => {
    const arrayRatingStars = [];
    for (let i = 0; i < 5; i++) {
        arrayRatingStars.push(
            <img src={i < Math.round(rating) ? star : notActiveStar}
                 alt="rating star"/>)
    }

    const resultRatingStars =
        arrayRatingStars.map((item, id) => (
            <img key={`star${id + 1}`} src={id < Math.round(rating) ? star : notActiveStar}
                 alt="rating star"/>
        ))

    const className = page === 'detailsPage' ? detailsBookItem.stars : booksListItem.stars;

    return (
        <div className={className}>
            {resultRatingStars}
        </div>
    )
}
