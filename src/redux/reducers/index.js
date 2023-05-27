import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {createBrowserHistory} from 'history';

import {bookDetailsReducer} from './book-details';
import {booksCntReducer, booksReducer} from './books';
import {categoriesReducer} from './categores';
import {authReducer} from "./auth";
import {registrationReducer} from "./registration";
import {passwordReducer} from "./password";

export const history = createBrowserHistory();

const initial = {};

export function appReducer(state = initial, action) {
    return state;
}

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    password: passwordReducer,
    registration: registrationReducer,
    books: booksReducer,
    bookDetails: bookDetailsReducer,
    count: booksCntReducer,
    categories: categoriesReducer,
    router: connectRouter(history),

})
