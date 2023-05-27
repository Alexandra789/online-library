import types from '../auth/actions-types';

const INITIAL_STATE = {
    loading: false,
    error: null,
    newUser: null,
    status: null,
    code: window.localStorage.getItem('code'),
};

export const registrationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.REGISTER_START:
            return {
                ...state,
                loading: true,
            };
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                newUser: action.payload,
                error: null,
                status: 200,
            };
        case types.REGISTER_FAILURE:
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
        default:
            return state;
    }
};
