import axios from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import {
    loginFailure,
    loginSuccess, registerFailure, registerSuccess
} from "../../reducers/auth/actions";

import types from "../../reducers/auth/actions-types";
import {URL_AUTH, URL_REGISTRATION} from "../../../constants/url";

const login = async (identifier, password) => {
    const response = await axios.post(`${URL_AUTH}`, {
        identifier,
        password,
    })

    localStorage.setItem('token', response.data.jwt);
    localStorage.setItem('username', response.data.user.firstName);
    if (localStorage.getItem('token')) {
        window.location.reload();
    }
    return response.data;
};


const register = async (email, username, password, firstName, lastName, phone) => {
    await axios.post(`${URL_REGISTRATION}`, {
        email,
        username,
        password,
        firstName,
        lastName,
        phone
    });
};

export function* loginWithCredentials({payload: {identifier, password}}) {
    try {
        const user = yield login(identifier, password);
        yield put(loginSuccess(user));
    } catch (error) {
        yield put(loginFailure(error));
    }
}

export function* registerWithCredentials({
                                             payload: {
                                                 email,
                                                 username,
                                                 password,
                                                 firstName,
                                                 lastName,
                                                 phone
                                             }
                                         }) {
    try {
        yield register(email, username, password, firstName, lastName, phone);
        yield put(registerSuccess({email, username, password, firstName, lastName, phone}));
    } catch (error) {
        yield put(registerFailure(error));
    }
}

export function* loginAfterRegister({payload: {identifier, password}}) {
    yield loginWithCredentials({payload: {identifier, password}});
}

export function* onLoginStart() {
    yield takeLatest(types.LOGIN_START, loginWithCredentials);
}

export function* onRegisterStart() {
    yield takeLatest(types.REGISTER_START, registerWithCredentials);
}

export function* onRegisterSuccess() {
    yield takeLatest(types.REGISTER_SUCCESS, loginAfterRegister);
}

export function* authSagas() {
    yield all([
        call(onLoginStart),
        call(onRegisterStart),
    ]);
}
