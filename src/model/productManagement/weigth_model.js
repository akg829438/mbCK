const mongoose = require("mongoose")
require("../../config/product_db")
const Collection = require("../../config/Collection")


const weigthSchema = new mongoose.Schema({
    weight_kg:{type:Number},
    weight_lb:{type:Number},
    weight_status:{type:String},
},
{timestamps:true}
)

const WeightModel = mongoose.model(Collection.Weight,weigthSchema)



module.exports = WeightModel

