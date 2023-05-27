/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React, {useState} from "react";
import {useSelector} from "react-redux";
import classNames from "classnames";

import filtersPanel from './filters-panel.module.css';
import './filters-panel.css';
import row from '../../img/row_icon.svg';
import col from '../../img/col_icon.svg';
import search from '../../img/search_icon.svg';
import sort from '../../img/sort_icon.svg';
import cross from '../../img/cross_icon.svg';
import {selectBooks} from "../../redux/reducers/books/selectors";

export function FiltersPanel({onChangeViewBooks, setSwitchName, setSearchValue,toggleSortByRating,sortByRating}) {
    const [isSearchOpen, toggleSearch] = useState(false);

    const openSearchMode = () => {
        toggleSearch(true);
    }

    React.useEffect(() => {
        if (isSearchOpen) {
            document.getElementById('searchInput').focus();
        }
    }, [isSearchOpen]);

    const closeSearchMode = () => {
        toggleSearch(false);
    }

    const toggleSortMode = () => {
        toggleSortByRating(!sortByRating)
    }

    const books = useSelector(selectBooks);

    const onSearch = (e) => {
        setSearchValue(e.target.value.trim().toLowerCase());
    };

    const hiddenClass = books.error ? "hidden" : " ";

    return (
        <div
            className={classNames([filtersPanel.panel, hiddenClass,"filters-panel"], {active: isSearchOpen})}>
            <button type="button" data-test-id='button-search-open' onClick={openSearchMode}
                    className={`${filtersPanel.input} input`}>
                <img src={search} className="search-img" alt="search img"/>
                <input value={books.value} onChange={onSearch} data-test-id="input-search"
                       inputMode="search" id="searchInput" type="search" name="search"
                       placeholder="Поиск книги или автора…"/>
                <img
                    data-test-id='button-search-close'
                    src={cross} className="close-search-panel-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        closeSearchMode();
                    }}
                    alt="cross img"/>
            </button>
            <button type="button" onClick={toggleSortMode}
                    className={classNames([filtersPanel.sort, "sort"], {active: sortByRating})}
                    id="rating"
                    data-test-id='sort-rating-button'
            >
                <img src={sort} alt="sort img"/>
                <p>По рейтингу</p>
            </button>
            <div className={`${filtersPanel.tabs} tabs`}>
                <button data-test-id="button-menu-view-window" onClick={(e) => {
                    setSwitchName(e.currentTarget.name);
                    onChangeViewBooks(e.currentTarget)
                }} id="tile" name="tile" aria-label="tab" type="button"
                        className={`${filtersPanel.tab} active`}>
                    <img src={col} alt="row icon"/>
                </button>
                <button data-test-id="button-menu-view-list" onClick={(e) => {
                    setSwitchName(e.currentTarget.name);
                    onChangeViewBooks(e.currentTarget)
                }} id="list" name="list" aria-label="tab" type="button"
                        className={filtersPanel.tab}>
                    <img src={row} alt="col icon"/>
                </button>
            </div>
        </div>
    )
}
