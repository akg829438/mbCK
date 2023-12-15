const mongoose = require("mongoose")
require("../../config/product_db")
const Collection = require("../../config/Collection")


const DiscountUnderTimeSchema = new mongoose.Schema({
    flatSale_id:{type:mongoose.Schema.ObjectId},
     startingTime:{type:String},
     endDayy:{type:String},
    discount :{type:Number}

} 

)



const DiscountUnderTimeModel = mongoose.model(Collection.DiscountUnderTime,DiscountUnderTimeSchema)

module.exports = DiscountUnderTimeModel
