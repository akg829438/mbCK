const mongoose = require("mongoose")
require("../../config/product_db")
const Collection = require("../../config/Collection")


const addtocartSchema = new mongoose.Schema({  
     items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,

    },
    
  ],
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
   
 
    
})

const AddToCartModel = mongoose.model(Collection.AddToCart,addtocartSchema)



module.exports = AddToCartModel

