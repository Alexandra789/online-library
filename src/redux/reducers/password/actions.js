import types from './actions-types';

export const recoveryPasswordStart = (email) => ({
    type: types.RECOVERY_PASSWORD_START,
    payload: email,
});

export const updatePage = () => ({
    type: types.UPDATE_PAGE,
});

export const recoveryPasswordSuccess = (status) => ({
    type: types.RECOVERY_PASSWORD_SUCCESS,
    payload: status,
});

export const recoveryPasswordFailure = (error) => ({
    type: types.RECOVERY_PASSWORD_FAILURE,
    payload: error,
});

export const sendMessageStart = (email) => ({
    type: types.SEND_MESSAGE_START,
    payload: email,
});

export const sendMessageSuccess = (status) => ({
    type: types.SEND_MESSAGE_SUCCESS,
    payload: status,
});

export const sendMessageFailure = (error) => ({
    type: types.SEND_MESSAGE_FAILURE,
    payload: error,
});
