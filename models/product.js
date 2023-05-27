const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

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
      },
  },
  {
    // created at and updated at are stored
    timestamps: true,
  }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
