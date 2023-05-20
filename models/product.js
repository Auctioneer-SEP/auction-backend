const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    postedBy: {
        type: ObjectId,
        required: true,
        unique : true
    }
}, {
    // created at and updated at are stored
    timestamps: true
});


const Product = mongoose.model('product', productSchema);

module.exports = Product;