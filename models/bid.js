const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const bidSchema = mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true,
    },
    amount: {
        type: String,
        required: true
    },
    productId: {
        type: ObjectId,
        required: true
    },
    productName: {
        type: String,
        // required: true
    },
    productPrice: {
        type: String,
        // required: true
    },
}, {
    // created at and updated at are stored
    timestamps: true
});


const Bid = mongoose.model('bid', bidSchema);

module.exports = Bid;