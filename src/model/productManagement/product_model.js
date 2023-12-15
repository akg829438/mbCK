const mongoose = require("mongoose")
require("../../config/product_db")
const Collection = require("../../config/Collection")


const productSchema = new mongoose.Schema({
    product_name:{type:String,required:[true,"Product name is Required field"]},
    featured_image:{type:String},
    main_shop_by_goal_name:{type:String},
    product_is_featured:{type:String},
    product_status:{type:String},
    product_qty:{type:Number},
    product_stock:{type:String},
    product_code:{type:String},
    product_mrp:{type:Number},
    product_discount:{type:String},
    product_price:{type:Number},
    product_retail_discount:{type:Number},
    product_retail_price:{type:Number},
    product_shipping_price:{type:Number},
    product_gst:{type:Number},
    product_hsn_code:{type:Number},
    product_branch:{type:String},
    product_category_name:{type:String},
    product_flavour:{type:String},
    product_weight:{type:String},
    product_descrption:{type:String},
    product_small_descrption:{type:String},
    product_meta_tag_title:{type:String},
    product_meta_tag_descrption:{type:String},
    product_meta_tag_keywords:{type:String},
    product_tags:{type:String},
    product_images:[{type:String}],

},
{timestamps:true}
)

const ProductModel = mongoose.model(Collection.All_Product,productSchema)



module.exports = ProductModel

