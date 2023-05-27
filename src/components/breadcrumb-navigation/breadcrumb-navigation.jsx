import {Link} from "react-router-dom";
import "./breadcrumb-navigation.css";

export const BreadcrumbNavigation = ({book, category, dictionaryCategory}) => {
    const {title} = book ? book : '';

    return (
        <div className="breadcrumb">
            <div className="container breadcrumb-container">
                <Link data-test-id='breadcrumbs-link'
                      to={`/books/${category}`}>{dictionaryCategory[category] ? dictionaryCategory[category] : 'Все книги'}</Link>
                <span>/</span><p data-test-id='book-name'>{title}</p>
            </div>
        </div>
    )
}
