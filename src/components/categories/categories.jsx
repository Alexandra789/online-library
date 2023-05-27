import {NavLink} from "react-router-dom";
import {useLocation, useParams} from "react-router";
import {useSelector} from "react-redux";
import classNames from "classnames";
import categories from './categories.module.css';
import './categories.css';
import arrow from '../../img/arrow.svg';
import {selectBooks} from "../../redux/reducers/books/selectors";
import {selectCategories} from "../../redux/reducers/categores/selectors";
import {selectBookDetails} from "../../redux/reducers/book-details/selectors";


export function Categories(props) {
    const {arrayBooksWithCountCategories} = props;
    const books = useSelector(selectBooks);
    const book = useSelector(selectBookDetails);
    const categoriesState = useSelector(selectCategories);

    const {category} = useParams()

    const showElements = categoriesState.loading || books.loading || books.error || categoriesState.error;
    const {pathname} = useLocation();
    const path = pathname.split('/').pop() === 'terms'
    || pathname.split('/').pop() === 'contract' ? 'all' : pathname.split('/').pop()

    const toggleCategoryMode = () => {
        if (props.toggleCategory) {
            props.toggleCategory(!props.isCategoryOpen);
        }
        if (props.mobileToggleCategories) {
            props.mobileToggleCategories(!props.isMobileCategoriesOpen);
        }
    }

    const visibilityCategoriesList = !categoriesState.data || categoriesState.loading;

    const closeMobileMenu = () => {
        if (props.mobileToggleCategories) {
            props.mobileToggleCategories(false);
            props.toggleMenuMode()
        }
    }

    const elements = categoriesState.data?.map(item => (
        <NavLink key={item.id}
                 onClick={() => {
                     if (props.toggleMenuMode) {
                         props.toggleMenuMode();
                     }
                 }}
                 className={`${categories.item} categories-link`}
                 to={`/books/${item.path}`}>
            <p data-test-id={props.burgerMenu ? `burger-${item.path}` : `navigation-${item.path}`}
               className='name'>{item.name}</p>
            <span
                data-test-id={props.burgerMenu ? `burger-book-count-for-${item.path}` : `navigation-book-count-for-${item.path}`}
                className='count'>
                        {arrayBooksWithCountCategories ?
                            arrayBooksWithCountCategories[item.name]?.length :
                            props.mobileArrayCount ? props.mobileArrayCount[item.name]?.length : ''
                        }
                    </span>
        </NavLink>
    ))

    return (
        <aside className={`${categories.categories} categories`}>
            <NavLink
                to={category ? `/books/${category}` : `/books/${path}`}
                data-test-id={props.burgerMenu ? 'burger-showcase' : 'navigation-showcase'}
                type="button" onClick={(e) => {
                toggleCategoryMode(e)
            }}
                className={classNames("categories-link section title",
                    {open: props.isCategoryOpen},
                    {open: props.isMobileCategoriesOpen}
                )}>
                <h5 className="categories-title">Витрина книг</h5>
                {showElements || book.error ? '' :
                    <img src={arrow} alt="arrow img"/>
                }
            </NavLink>
            {showElements || book.error ? '' :
                <div className="categories-wrapper">
                    {showElements || book.error ? '' :
                        <NavLink
                            onClick={() => {
                                if (props.toggleMenuMode) {
                                    props.toggleMenuMode();
                                }
                            }}
                            className={`${categories.item} categories-link`}
                            to='/books/all'>
                            <p data-test-id={props.burgerMenu ? 'burger-books' : 'navigation-books'}
                               className={`${visibilityCategoriesList ? "hidden" : 'name'}`}>Все
                                книги</p>
                        </NavLink>}
                    {elements}
                </div>
            }
            <NavLink data-test-id={props.burgerMenu ? 'burger-terms' : 'navigation-terms'}
                     onClick={closeMobileMenu} to="/terms"
                     className=
                         {classNames("section categories-link", {no_active: props.isCategoryOpen})}>
                <p className="categories-title">Правила пользования</p></NavLink>
            <NavLink data-test-id={props.burgerMenu ? 'burger-contract' : 'navigation-contract'}
                     onClick={closeMobileMenu}
                     to="/contract"
                     className=
                         {classNames("section categories-link", {no_active: props.isCategoryOpen})}>
                <p className="categories-title">Договор оферты</p></NavLink>
        </aside>
    )
}
