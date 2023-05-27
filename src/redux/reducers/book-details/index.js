import {
    REQUESTED_BOOK_DETAILS,
    REQUESTED_BOOK_DETAILS_FAILURE,
    REQUESTED_BOOK_DETAILS_SUCCESS,
} from './actions';

const initialBookDetailsState = {
    loading: false,
    error: null,
    data: null,
}

export function bookDetailsReducer(state = initialBookDetailsState, action) {
    switch (action.type) {
        case REQUESTED_BOOK_DETAILS: {
            return {
                ...state,
                loading: true,
            }
        }
        case REQUESTED_BOOK_DETAILS_SUCCESS: {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            }
        }
        case REQUESTED_BOOK_DETAILS_FAILURE: {
            return {
                loading: false,
                error: action.payload,
            }
        }
        default: {
            return state;
        }
    }
}
