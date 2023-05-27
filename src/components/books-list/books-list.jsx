import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useLocation} from "react-router";
import {BooksListItem} from "../books-list-item";
import {FiltersPanel} from "../filters-panel";
import './books-list.css';
import booksListItem from '../books-list-item/books-list-item.module.css';

export function BooksList({books, dictionaryCategory, arrayBooksWithCountCategories}) {
    const [switchName, setSwitchName] = useState('tile');
    const [searchValue, setSearchValue] = useState('');
    const [sortByRating, toggleSortByRating] = useState(false);
    let {category} = useParams();
    const {pathname} = useLocation();
    category = category ? category : pathname.split('/').pop();

    const onChangeViewBooks = (button) => {
        const buttons = button.parentElement.children;
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('active');
        }
        button.classList.add('active');
    }

    const elementsFilterByCategory =
        books?.data?.filter(item => item.categories.join(' ').includes(dictionaryCategory[category] ? dictionaryCategory[category] : ''));

    const elementsFilterBySearch = elementsFilterByCategory?.filter(item => item.title.toLowerCase().includes(searchValue));
    elementsFilterBySearch?.sort((a, b) => sortByRating ? a.rating > b.rating ? 1 : -1 : a.rating < b.rating ? 1 : -1);

    const highlightSearchValue = (str) => {
        if (!searchValue) return str
        const regexp = new RegExp(searchValue, 'ig')
        const matchValue = str.match(regexp)

        if (matchValue) {
            return str.split(regexp).map((item, index, array) => {
                if (index < array.length - 1) {
                    const highlightValue = matchValue.shift()
                    return <>{item}<span data-test-id='highlight-matches'
                                         className='hightlight'>{highlightValue}</span></>
                }
                return item;
            })
        }
        return str;
    }

    const elements = elementsFilterBySearch?.map(item => (
        <BooksListItem key={item.id} {...item}
                       highlightSearchValue={highlightSearchValue} category={category}/>
    ));

    const ifSearchingNotFound = !elements?.length && arrayBooksWithCountCategories[dictionaryCategory[category]]?.length;
    const ifCategoryBookIsEmpty = !elements?.length && !arrayBooksWithCountCategories[dictionaryCategory[category]]?.length && category !== 'all';
    const ifNoLoadingAndNoError = !books?.loading && !books.error;
    const checkIfAllBooksCategory = ifSearchingNotFound === undefined && category === 'all';

    return (
        <div className='book-list__main-content'>
            <FiltersPanel toggleSortByRating={toggleSortByRating} sortByRating={sortByRating}
                          setSearchValue={setSearchValue} setSwitchName={setSwitchName}
                          onChangeViewBooks={onChangeViewBooks}/>
            <ul className={`book-list__card ${!elements?.length ? 'hidden' : ''} ${switchName === 'tile' ? booksListItem.tile : booksListItem.list}`}>
                {elements}
            </ul>
            <div
                className={`${ifNoLoadingAndNoError && ifCategoryBookIsEmpty ? "not-found show" : "not-found"}`}>
                <p data-test-id="empty-category" className="text">В этой категории книг ещё нет</p>
            </div>
            {books?.data &&
                <div
                    className={`${ifNoLoadingAndNoError ? ifSearchingNotFound ? "show"
                        : checkIfAllBooksCategory ? "show" : "" : ""} not-found`}>
                    <p data-test-id="search-result-not-found" className="text">По запросу ничего не
                        найдено</p>
                </div>
            }
        </div>
    )
}
