const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const moment = require('moment-timezone');

let date = new Date(); 
let kolkataDate = moment(date).tz("Asia/Kolkata").toDate();

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    price: {
      type: String,
      required: true,
    },
    postedBy: {
      type: ObjectId,
      required: true,
      unique : false
    },
    status: {
      type: Boolean,
      default : false,
    },
    highBid: {
      type: ObjectId,
      required: false
    },
    endtime: {
      type: Date,
      required: true,
      get: function(value) {
        return moment(value).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
      }
    },
  },
  {
    // created at and updated at are stored
    timestamps: true,
  }
);

productSchema.set('toObject', { getters: true });
productSchema.set('toJSON', { getters: true });

const Product = mongoose.model("product", productSchema);

module.exports = Product;
