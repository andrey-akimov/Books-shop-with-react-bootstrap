var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// APIs
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop', { useMongoClient: true });

const Books = require('./models/books');
const db = mongoose.connection;

// SESSION
app.use(
    session({
        secret: 'mySecretString',
        saveUninitialized: false,
        resave: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 },
        store: new MongoStore({
            mongooseConnection: db,
            ttl: 2 * 24 * 60 * 60
        })
    })
);

// SAVE SESSION CART
app.post('/cart', (res, req) => {
    let cart = req.req.body;
    req.req.session.cart = cart;
    req.req.session.save(err => {
        if (err) {
            throw err;
        }
        res.res.json(req.req.session.cart);
    });
});

// GET SESSION CART
app.get('/cart', (res, req) => {
    if (typeof req.req.session.cart !== 'undefined') {
        res.res.json(req.req.session.cart);
    }
});

// POST BOOKS
app.post('/books', (req, res) => {
    let book = req.body;

    Books.create(book, (err, books) => {
        if (err) {
            throw err;
        }
        res.json(books);
    });
});

// GET BOOKS
app.get('/books', (req, res) => {
    Books.find((err, books) => {
        if (err) {
            throw err;
        }
        res.json(books);
    });
});

// DELETE BOOKS
app.delete('/books/:_id', (req, res) => {
    let query = { _id: req.params._id };

    Books.remove(query, (err, books) => {
        if (err) {
            throw err;
        }
        res.json(books);
    });
});

// UPDATE BOOKS
app.put('/books/:_id', (req, res) => {
    let book = req.body;
    let query = { _id: req.params._id };

    let update = {
        $set: {
            title: book.title,
            description: book.description,
            image: book.image,
            price: book.price
        }
    };

    let options = { new: true };

    Books.findOneAndUpdate(query, update, options, (err, books) => {
        if (err) {
            throw err;
        }
        res.json(books);
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
