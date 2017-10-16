import booksReducers from './booksReducers';
import cardReducers from './cardReducers';
import { combineReducers } from 'redux';

export default combineReducers({
    books: booksReducers,
    cart: cardReducers
});
