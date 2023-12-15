const mongoose = require("mongoose")
require("../../config/product_db")
const Collection = require("../../config/Collection")


const couponSchema = new mongoose.Schema({
    coupon_code:{type:String},
    coupon_used_type:{type:String},
    coupon_discount_value:{type:String},
    coupon_valid_upto:{type:String},
    coupon_minumum_amount_require:{type:String},
    coupon_max_discount_value:{type:String},
    coupon_title:{type:String},
    coupon_description:{type:String},
    coupon_product_id:{type:String},

},
{timestamps:true}
)

const CouponModel = mongoose.model(Collection.Coupon,couponSchema)



module.exports = CouponModel

