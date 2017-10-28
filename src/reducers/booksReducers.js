const initialState = {
    books: []
};

export default function booksReducers(state = initialState, action) {
    switch (action.type) {
        case 'GET_BOOK':
            return { books: action.payload };
            break;

        case 'POST_BOOK':
            return {
                books: [...state.books, { _id: Date.now(), ...action.payload }],
                msg: 'Saved! Click to continue',
                style: 'success',
                validation: 'success'
            };
            break;

        case 'POST_BOOK_REJECTED':
            return {
                ...state,
                msg: 'Please, try again',
                style: 'danger',
                validation: 'error'
            };
            break;

        case 'DELETE_BOOK':
            return {
                books: state.books.filter(book => book._id != action.payload)
            };
            break;

        case 'UPDATE_BOOK':
            return {
                books: state.books.map(book => {
                    if (book._id === action.payload._id) {
                        book.title = action.payload.title;
                    }
                    return book;
                })
            };
            break;

        case 'RESET_BUTTON':
            return {
                books: state.books,
                msg: null,
                style: 'primary',
                validation: null
            };

        default:
            return state;
    }
}
