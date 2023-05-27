import {REQUESTED_BOOKS, REQUESTED_BOOKS_FAILURE, REQUESTED_BOOKS_SUCCESS} from './actions';

const initialBooksState = {
    loading: false,
    error: null,
    data: null,
    count: [],
}

export function booksReducer(state = initialBooksState, action) {
    switch (action.type) {
        case REQUESTED_BOOKS: {
            return {
                ...state,
                loading: true,
            }
        }
        case REQUESTED_BOOKS_SUCCESS: {
            return {
                ...state,
                loading: false,
                data: action.payload,
            }
        }
        case REQUESTED_BOOKS_FAILURE: {
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

export function booksCntReducer(state = initialBooksState, action) {
    switch (action.type) {
        case 'GET_COUNT_BOOKS' : {
            return {
                count: action.payload.count
            }
        }
        default: {
            return state;
        }
    }
}
