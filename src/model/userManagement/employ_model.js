const mongoose = require("mongoose")
require("../../config/product_db")
const Collection = require("../../config/Collection")


const employeeSchema = new mongoose.Schema({
    employee_name:{type:String,required:[true,"employee name is Required field"]},
    employee_email:{type:String,required:[true,"employee email is Required field"]},
    employee_phonenumber:{type:Number,required:[true,"employee number is Required field"]},
    employee_address:{type:String},
    employee_dob:{type:String},
    employee_city:{type:String},
    employee_status:{type:String},
},
{timestamps:true}
)

const EmployeeModel = mongoose.model(Collection.Employee_List,employeeSchema)



module.exports = EmployeeModel

