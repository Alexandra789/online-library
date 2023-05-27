import {
    REQUESTED_CATEGORIES,
    REQUESTED_CATEGORIES_FAILURE,
    REQUESTED_CATEGORIES_SUCCESS
} from './actions';

const initialBooksState = {
    loading: false,
    error: null,
    data: null,
}

export function categoriesReducer(state = initialBooksState, action) {
    switch (action.type) {
        case REQUESTED_CATEGORIES: {
            return {
                ...state,
                loading: true,
            }
        }
        case REQUESTED_CATEGORIES_SUCCESS: {
            return {
                ...state,
                loading: false,
                data: action.payload,
            }
        }
        case REQUESTED_CATEGORIES_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        }
        default: {
            return state;
        }
    }
}
