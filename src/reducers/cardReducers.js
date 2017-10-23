const initialState = {
    cart: [],
    total: {
        totalQuantity: 0,
        totalCash: 0
    }
};

export default function cartReducers(state = initialState, action) {
    switch (action.type) {
        case 'GET_CART':
            return {
                cart: action.payload,
                total: calc(action.payload)
            };
            break;

        case 'ADD_TO_CART':
            var cart = action.payload;
            return {
                cart,
                total: calc(cart)
            };
            break;

        case 'UPDATE_CART':
            return {
                cart: action.newCart,
                total: calc(state.cart)
            };
            break;

        case 'DELETE_CART_ITEM':
            return {
                cart: action.payload,
                total: calc(action.payload)
            };
            break;

        default:
            return state;
            break;
    }
}

function calc(arr) {
    const totalQuantity = arr.map(el => el.quantity).reduce((a, b) => a + b, 0);
    const totalCash = arr
        .map(el => el.quantity * el.price)
        .reduce((a, b) => a + b, 0)
        .toFixed(2);
    return {
        totalQuantity,
        totalCash
    };
}
