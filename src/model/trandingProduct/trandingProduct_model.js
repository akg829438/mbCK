const mongoose = require("mongoose")
require("../../config/product_db")
const Collection = require("../../config/Collection")


const trandingProductSchema = new mongoose.Schema({
  trandingProduct_name:{type:String},
  mainTrandingProduct_name:{type:String},
  mainTrandingProductdescription:{type:String},
  trandingProduct_image:{type:String}, 
},
{timestamps:true}
)



const TrandingProductModel = mongoose.model(Collection.TrandingProduct,trandingProductSchema)



module.exports = TrandingProductModel

