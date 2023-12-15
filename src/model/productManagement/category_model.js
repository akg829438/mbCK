const mongoose = require("mongoose")
require("../../config/product_db")
const Collection = require("../../config/Collection")

const catSchema = new mongoose.Schema({
    category_name:{type:String,required:[true,"Category name is Required field"]},
    main_category_name:{type:String,required:[true,"Category title is Required field"]},
    category_descrption:{type:String},
    category_goal:{type:String},
    category_image:{type:String},
    category_status:{type:String},
    category_menu_link:{type:String},
    category_artical:{type:String},
    category_meta_tag_title:{type:String},
    category_meta_tag_descrption:{type:String},
    category_meta_tag_keywords:{type:String},
},
{timestamps:true}
)

const CategoryModel = mongoose.model(Collection.Category,catSchema)



module.exports = CategoryModel

