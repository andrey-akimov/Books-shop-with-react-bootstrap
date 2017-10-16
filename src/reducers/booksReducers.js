const initialState = {
    books: [
        {
            _id: 1,
            title: 'Robinzon Cruzo',
            description: 'This is the description of 2 book',
            price: 35,
            quantity: 1
        },
        {
            _id: 2,
            title: 'mongoDB in 24h',
            description: 'This is the description of 1 book',
            price: 25,
            quantity: 1
        }
    ]
};

export default function booksReducers(state = initialState, action) {
    switch (action.type) {
        case 'GET_BOOK':
            return state;
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
