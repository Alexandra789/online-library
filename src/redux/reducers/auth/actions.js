import types from './actions-types';

export const loginStart = (credentials) => ({
    type: types.LOGIN_START,
    payload: credentials,
});

export const loginSuccess = (user) => ({
    type: types.LOGIN_SUCCESS,
    payload: user,
});

export const loginFailure = (error) => ({
    type: types.LOGIN_FAILURE,
    payload: error,
});

export const logOut = () => ({
    type: types.LOG_OUT,
});

export const registerStart = (credentials) => ({
    type: types.REGISTER_START,
    payload: credentials,
});

export const registerSuccess = (user) => ({
    type: types.REGISTER_SUCCESS,
    payload: user,
});

export const registerFailure = (error) => ({
    type: types.REGISTER_FAILURE,
    payload: error,
});
