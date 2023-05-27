import types from './actions-types';

const INITIAL_STATE = {
    loading: false,
    error: null,
    currentUser: null,
    status: null,
    token: window.localStorage.getItem('token'),
};

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.LOGIN_START:
            return {
                ...state,
                loading: true,
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
                error: null,
                status: 200,
            };
        case types.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: action.payload.response.status,
            };
        case types.UPDATE_PAGE:
            return {
                loading: false,
                error: null,
                status: null,
            };
        case types.LOG_OUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};
