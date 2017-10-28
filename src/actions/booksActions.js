import axios from 'axios';

// GET A BOOK
export function getBooks() {
    return function(dispatch) {
        axios
            .get('/books')
            .then(res => {
                dispatch({ type: 'GET_BOOK', payload: res.data });
            })
            .catch(err => {
                dispatch({
                    type: 'GET_BOOK_REJECTED',
                    payload: err
                });
            });
    };
}
// POST A BOOK
export function postBooks(book) {
    return function(dispatch) {
        axios
            .post('/books', book)
            .then(res => {
                dispatch({
                    type: 'POST_BOOK',
                    payload: book
                });
            })
            .catch(err => {
                dispatch({
                    type: 'POST_BOOK_REJECTED',
                    payload: 'there was an error while posting a new book'
                });
            });
    };
}
// DELETE A BOOK
export function deleteBooks(_id) {
    return function(dispatch) {
        axios
            .delete(`/books/${_id}`)
            .then(res => {
                dispatch({
                    type: 'DELETE_BOOK',
                    payload: _id
                });
            })
            .catch(err => {
                dispatch({
                    type: 'DELETE_BOOK_REJECTED',
                    payload: err
                });
            });
    };
}
// UPDATE A BOOK
export function updateBooks(book) {
    return {
        type: 'UPDATE_BOOK',
        payload: book
    };
}
// RESET FORM BUTTON
export function resetButton(book) {
    return {
        type: 'RESET_BUTTON'
    };
}
