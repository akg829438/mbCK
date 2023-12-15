const mongoose = require("mongoose")
require("../../config/product_db")
const Collection = require("../../config/Collection")


const registeredUserListSchema = new mongoose.Schema({
    registered_user_name:{type:String,required:[true,"User name is Required field"]},
    registered_user_email:{type:String,required:[true,"User email is Required field"]},
    registered_user_phonenumber:{type:Number,required:[true,"User number is Required field"]},
    registered_user_address:{type:String},
    registered_user_date_time:{type:String},
},
{timestamps:true}
)

const RegisteredUserListModel = mongoose.model(Collection.Registered_User_List,registeredUserListSchema)



module.exports = RegisteredUserListModel

