const mongoose = require('mongoose');
require('../../config/product_db')

const Collection = require('../../config/Collection');




const OrderSchema = new mongoose.Schema({

    razorpay_order_id: { type: String },
    razorpay_payment_id: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    items: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                
            },
        }
    ],
    currentDate:{type:String},
    currentTime:{type:String},
    shippingAddress: {
        name:{type:String,required:true},
        mobile:{type:Number,required:true},
        address: { type: String, required: true },
        locality: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pinCode: { type: String, required: true },
      
      
    }
},
    { timestamps: true }
)

const OrderModel = mongoose.model(Collection.PaymentUser, OrderSchema)
module.exports = OrderModel;