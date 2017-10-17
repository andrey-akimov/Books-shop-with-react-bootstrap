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
                books: [...state.books, { _id: Date.now(), ...action.payload }]
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

        default:
            return state;
    }
}
