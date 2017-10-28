const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
    {
        title: String,
        description: String,
        image: String,
        price: Number
    },
    { versionKey: false }
);

const Books = mongoose.model('Books', bookSchema);
module.exports = Books;
