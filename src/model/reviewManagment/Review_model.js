const mongoose = require("mongoose")
require("../../config/product_db")
const Collection = require("../../config/Collection")


const reviewSchema = new mongoose.Schema({
    review_rate:{type:Number},
    review_title:{type:String},
    review_description:{type:String},
    product_id:{type: mongoose.Schema.Types.ObjectId},
    user_id:{type: mongoose.Schema.Types.ObjectId,ref:'User'},
    published_date:{type:Date},
},
{timestamps:true}
)

const ReviewModel = mongoose.model(Collection.ReviewUser,reviewSchema)



module.exports = ReviewModel

