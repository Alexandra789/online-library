import types from './actions-types';

const INITIAL_STATE = {
    loading: false,
    error: null,
    status: null,
    user: null,
};

export const passwordReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SEND_MESSAGE_START:
            return {
                ...state,
                loading: true,
            };
        case types.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
            };
        case types.SEND_MESSAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case types.RECOVERY_PASSWORD_START:
            return {
                ...state,
                loading: true,
            };
        case types.RECOVERY_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                user: action.payload.data,
            };
        case types.RECOVERY_PASSWORD_FAILURE:
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
