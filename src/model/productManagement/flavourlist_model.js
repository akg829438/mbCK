const mongoose = require("mongoose")
require("../../config/product_db")
const Collection = require("../../config/Collection")


const flavourSchema = new mongoose.Schema({
    flavour_name:{type:String,required:[true,"Flavour name name is Required field"]},
    flavour_status:{type:String,required:[true,"Flavour status is Required field"]},
},
{timestamps:true}
)

const FlavourModel = mongoose.model(Collection.Flavour,flavourSchema)



module.exports = FlavourModel

