import React, {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router";

import {useDispatch, useSelector} from "react-redux";
import {selectBooks} from "../../redux/reducers/books/selectors";

import './home.css';

import {Categories} from "../../components/categories";
import {BooksList} from "../../components/books-list";
import {ErrorNotification} from "../../components/error-notification";
import {selectCategories} from "../../redux/reducers/categores/selectors";
import {Loader} from "../../components/loader";

export function Home({category, dictionaryCategory}) {
    const categoriesState = useSelector(selectCategories);
    const [isCategoryOpen, toggleCategory] = useState(!categoriesState.data);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'REQUESTED_BOOKS'})
    }, [dispatch]);

    const books = useSelector(selectBooks);

    const arrayBooksWithCountCategories = useMemo(() => [], []);

    category?.forEach(itemCateg => {
        arrayBooksWithCountCategories[itemCateg.name] = books.data?.filter(item => item.categories.join(' ').includes(itemCateg.name))
    });

    useEffect(() => {
        if (Object.keys(arrayBooksWithCountCategories).length) {
            dispatch({
                type: 'GET_COUNT_BOOKS',
                payload: {
                    count: arrayBooksWithCountCategories,
                }
            })
        }
    }, [dispatch, arrayBooksWithCountCategories]);

    return (
        <div className="home-page">
            <Loader page={books}/>
            <ErrorNotification page={books}/>
            <div className="main-content container">
                <Categories arrayBooksWithCountCategories={arrayBooksWithCountCategories}
                            isCategoryOpen={isCategoryOpen} toggleCategory={toggleCategory}/>
                <BooksList arrayBooksWithCountCategories={arrayBooksWithCountCategories}
                           dictionaryCategory={dictionaryCategory} books={books}/>
            </div>
        </div>
    )
}
