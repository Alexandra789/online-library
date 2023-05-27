import axios from "axios";
import {put, takeEvery} from 'redux-saga/effects';

import {ALL_BOOKS_URL} from '../../../constants/url';
import {
    REQUESTED_BOOK_DETAILS, REQUESTED_BOOK_DETAILS_FAILURE,
    REQUESTED_BOOK_DETAILS_SUCCESS
} from '../../reducers/book-details/actions';
import {
    REQUESTED_BOOKS,
    REQUESTED_BOOKS_FAILURE,
    REQUESTED_BOOKS_SUCCESS
} from '../../reducers/books/actions';

export function* loadBooksDetails({payload}) {
    const id = payload;
    const request = yield axios.get(
        `${ALL_BOOKS_URL}/${id}`,
        {
            headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`},
        }
    );

    if (request.error) {
        yield put({
            type: REQUESTED_BOOK_DETAILS_FAILURE,
            payload: request.error,
        })
    } else {
        yield put({
            type: REQUESTED_BOOK_DETAILS_SUCCESS,
            payload: request.data,
        })
    }
}

export function* loadBooksList() {
    const request = yield axios.get(
        ALL_BOOKS_URL,
        {
            headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`},
        }
    );

    if (request.error) {
        yield put({
            type: REQUESTED_BOOKS_FAILURE,
            payload: request.error,
        })
    } else {
        yield put({
            type: REQUESTED_BOOKS_SUCCESS,
            payload: request.data,
        })
    }
}

export function* booksSaga() {
    yield takeEvery('REQUESTED_BOOKS', loadBooksList);
    yield takeEvery('REQUESTED_BOOK_DETAILS', loadBooksDetails);
}
