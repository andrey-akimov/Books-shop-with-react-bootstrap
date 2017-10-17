import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import reducers from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { addToCart } from './actions/cartActions';
import { postBooks, deleteBooks, updateBooks } from './actions/booksActions';
import BooksList from './components/pages/BooksList';
import Cart from './components/pages/Cart';
import BooksForm from './components/pages/BooksForm';
import Menu from './components/Menu';
import Footer from './components/Footer';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Menu />
                <Switch>
                    <Route exact path="/" component={BooksList} />
                    <Route path="/admin" component={BooksForm} />
                    <Route path="/cart" component={Cart} />
                </Switch>
                <Footer />
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// store.dispatch(
//     postBooks({
//         _id: 2,
//         title: 'Robinzon Cruzo',
//         price: 35,
//         description: 'This is the description of 1 book'
//     })
// );

// store.dispatch(
//     deleteBooks({
//         _id: 1
//     })
// );

// store.dispatch(
//     updateBooks({
//         _id: 2,
//         title: 'Zzzzzzzzz'
//     })
// );

// store.dispatch(addToCart([{ _id: 1 }]));
