import axios from "axios";

import {put, takeEvery} from 'redux-saga/effects';

import {ALL_CATEGORIES_URL} from '../../../constants/url';
import {
    REQUESTED_CATEGORIES,
    REQUESTED_CATEGORIES_FAILURE,
    REQUESTED_CATEGORIES_SUCCESS
} from '../../reducers/categores/actions';


export function* loadCategories() {
    const request = yield axios.get(
        ALL_CATEGORIES_URL,
        {
            headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`},
        }
    );

    if (request.error) {
        yield put({
            type: REQUESTED_CATEGORIES_FAILURE,
            payload: request.error,
        })
    } else {
        yield put({
            type: REQUESTED_CATEGORIES_SUCCESS,
            payload: request.data,
        })
    }
}

export function* categoriesSaga() {
    yield takeEvery('REQUESTED_CATEGORIES', loadCategories);
}
