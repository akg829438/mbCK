const mongoose = require("mongoose")
require("../../config/product_db")
const Collection = require("../../config/Collection")
const { getPasswordHash } = require("../../utils/Utils")


const adminloginSchema = new mongoose.Schema({
    admin_email:{type:String,required:[true,"name is required feild"],unique:true},
    admin_password:{type:String,required:[true,"password is required feild"]},
   
},
{timestamps:true}
)

adminloginSchema.pre("save",function(){
    this.admin_password = getPasswordHash(this.admin_password)
})


const AdminLoginModel = mongoose.model(Collection.Admin_Login,adminloginSchema)



module.exports = AdminLoginModel

