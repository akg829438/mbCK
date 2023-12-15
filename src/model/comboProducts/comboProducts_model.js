const mongoose = require("mongoose")
require("../../config/product_db")
const Collection = require("../../config/Collection")
const ComboSchema = new mongoose.Schema({
    product_name:{type:String,required:[true,"Product name is Required field"]},
    product_images:[{type:String}],
    featured_image:{type:String},
    product_qty:{type:Number},
    product_mrp:{type:Number},
    prodcut_discount:{type:String},
    product_price:{type:Number},
    product_retail_price:{type:Number},
    product_gst:{type:Number},
    prodcut_hsn_code:{type:Number},
    product_weight:{type:String},
    product_descrption:{type:String},
    product_small_descrption:{type:String},
    products:[{product:{type:mongoose.Schema.Types.ObjectId,ref:'Product'}}],
},
{timestamps:true}
)
const ComboModel = mongoose.model(Collection.Combo_Products,ComboSchema)
module.exports = ComboModel