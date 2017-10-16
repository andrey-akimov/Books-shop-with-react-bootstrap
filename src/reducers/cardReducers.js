const initialState = {
    cart: [],
    total: {
        totalQuantity: 0,
        totalCash: 0
    }
};

export default function cartReducers(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            var cart = [...state.cart, action.payload];
            return {
                cart,
                total: calc(cart)
            };
            break;

        case 'DELETE_CART_ITEM':
            var cart = state.cart.filter(el => el._id !== action.payload);
            return {
                cart,
                total: calc(cart)
            };
            break;

        case 'UPDATE_CART':
            return {
                cart: state.cart.map(el => {
                    if (el._id === action._id) {
                        el.quantity += action.unit;
                    }
                    return el;
                }),
                total: calc(state.cart)
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
