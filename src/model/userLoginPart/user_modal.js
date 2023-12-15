const mongoose = require('mongoose')
const Collection = require('../../config/Collection')
require('../../config/product_db')

const addressSchema = new mongoose.Schema({
    name:{type:String,required:true},
    mobile:{type:Number,required:true},
    address: { type: String, required: true },
   locality: { type: String, required: true },
   city: { type: String, required: true },
   state: { type: String, required: true },
   pinCode: { type: String, required: true },
   isDefault: { type: Boolean, default: false }
     
},
    { timestamps: true }
)
const userLoginSchema = new mongoose.Schema({
    name: {
        type:  String
    },
    email:{
        type:String,
        unique:true,
        sparse:true,
        index:true
    },
    facebookId:{
        type:String,
        unique:true,
        sparse:true,
        index:true
    },
    googleId:{
        type:String,
        unique:true,
        sparse:true,
        index:true
    },
    mobile: {
        type:  Number,
        unique:  true,
        sparse:true,
        index:true
    },
    addresses:[addressSchema],
    defaultAddress: addressSchema,
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
      },
    wishlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wishlist',
    },
},
{timestamps:true}
)

const UserLoginModel = mongoose.model(Collection.UserLogin,userLoginSchema)
module.exports = UserLoginModel;