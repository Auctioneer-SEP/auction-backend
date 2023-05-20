const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const favSchema = mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true,
    }, 
    // for a user we will fecth diff product ID 
    //and display their favourite items
    productId: {
        type: ObjectId,
        required: true,
    }
}, {
    // created at and updated at are stored
    timestamps: true
});


const Fav = mongoose.model('fav', favSchema);

module.exports = Fav;