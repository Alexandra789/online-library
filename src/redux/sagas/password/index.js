/* eslint-disable */

import axios from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';

import {
    recoveryPasswordFailure,
    recoveryPasswordSuccess,
    sendMessageFailure,
    sendMessageSuccess
} from "../../reducers/password/actions";

import types from '../../reducers/password/actions-types';
import {URL_FORGOT_PASSWORD, URL_RESET_PASSWORD} from "../../../constants/url";

const recoveryPassword = async (password, passwordConfirmation, code) => (
    await axios.post(`${URL_RESET_PASSWORD}`, {
        password,
        passwordConfirmation,
        code
    })
);

export function* recoveryPasswordWatcher({payload: {password, passwordConfirmation, code}}) {
    try {
        const response = yield recoveryPassword(password, passwordConfirmation, code);
        yield put(recoveryPasswordSuccess(response));
    } catch (error) {
        yield put(recoveryPasswordFailure(error));
    }
}

const sendMessageRecoveryPassword = async (email) => {
    return await axios.post(`${URL_FORGOT_PASSWORD}`, {
        email,
    });
};

export function* sendMessageRecoveryPasswordWatcher({payload: {email}}) {
    try {
        const response = yield sendMessageRecoveryPassword(email);
        yield put(sendMessageSuccess(response));
    } catch (error) {
        yield put(sendMessageFailure(error));
    }
}

export function* onSendMessagePassword() {
    yield takeLatest(types.SEND_MESSAGE_START, sendMessageRecoveryPasswordWatcher);
}

export function* onRecoveryPassword() {
    yield takeLatest(types.RECOVERY_PASSWORD_START, recoveryPasswordWatcher);
}

export function* passwordSagas() {
    yield all([
        call(onSendMessagePassword),
        call(onRecoveryPassword),
    ]);
}
