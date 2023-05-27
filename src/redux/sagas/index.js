import {all, spawn} from 'redux-saga/effects';

import {booksSaga} from './books';
import {categoriesSaga} from './categories';
import {authSagas} from "./auth";
import {passwordSagas} from "./password";

export function* rootSaga() {
    const sagas = [booksSaga, categoriesSaga, authSagas, passwordSagas];

    yield all(sagas.map(state => spawn(state)));
}
