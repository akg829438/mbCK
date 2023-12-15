const mongoose = require("mongoose")
require("../../config/product_db")
const Collection = require("../../config/Collection")


const wishlistSchema = new mongoose.Schema({
    items: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
          },
        },
        
      ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
},
    { timestamps: true }
)

const WishlistModel = mongoose.model(Collection.Wishlist, wishlistSchema)



module.exports = WishlistModel

