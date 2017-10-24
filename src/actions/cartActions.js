import axios from 'axios';

// GET CART
export function getCart() {
    return function(dispatch) {
        axios
            .get('/cart')
            .then(res => {
                dispatch({
                    type: 'GET_CART',
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch({
                    type: 'GET_CART_REJECTED',
                    msg: 'ERROR when getting the cart from session'
                });
            });
    };
}

// ADD TO CART
export function addToCart(cart) {
    return function(dispatch) {
        axios
            .post('/cart', cart)
            .then(res => {
                dispatch({
                    type: 'ADD_TO_CART',
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch({
                    type: 'ADD_TO_CART_REJECTED',
                    msg: 'ERROR when adding to the cart'
                });
            });
    };
}

// UPDATE CART
export function updateCart(_id, unit, cart) {
    let newCart = cart.map(el => {
        if (el._id === _id) {
            el.quantity += unit;
        }
        return el;
    });

    return function(dispatch) {
        axios
            .post('/cart', newCart)
            .then(res => {
                dispatch({
                    type: 'UPDATE_CART',
                    newCart
                });
            })
            .catch(err => {
                dispatch({
                    type: 'UPDATE_CART_REJECTED',
                    msg: 'ERROR when updating to the cart'
                });
            });
    };
}

// DELETE FROM CART
export function deleteCartItem(cart) {
    return function(dispatch) {
        axios
            .post('/cart', cart)
            .then(res => {
                dispatch({
                    type: 'DELETE_CART_ITEM',
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch({
                    type: 'DELETE_CART_ITEM_REJECTED',
                    msg: 'ERROR when deleting an item from the cart'
                });
            });
    };
}
