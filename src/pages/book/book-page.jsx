import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {DetailsBookItem} from "../../components/details-book-item";
import detailsBookPage from "./book-page.module.css";
import {BreadcrumbNavigation} from "../../components/breadcrumb-navigation";
import {selectBookDetails} from "../../redux/reducers/book-details/selectors";

import {
    REQUESTED_BOOK_DETAILS,
} from "../../redux/reducers/book-details/actions";
import {Loader} from "../../components/loader";
import {ErrorNotification} from "../../components/error-notification";

export const BookPage = ({dictionaryCategory}) => {
    const {bookId, category} = useParams();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: 'REQUESTED_BOOK_DETAILS', payload: bookId})
    }, [dispatch, bookId]);

    const book = useSelector(selectBookDetails);

    return (
        <div className="book-page">
            <Loader page={book}/>
            <ErrorNotification page={book}/>
            <div className={detailsBookPage.details_book_page}>
                <BreadcrumbNavigation dictionaryCategory={dictionaryCategory} category={category}
                                      book={book.data}/>
                <div className={book.loading || book.error ? "container hidden" : "container"}>
                    <DetailsBookItem book={book.data}/>
                </div>
            </div>
        </div>
    )
}
