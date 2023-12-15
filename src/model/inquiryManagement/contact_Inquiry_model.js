const mongoose = require("mongoose")
require("../../config/product_db")
const Collection = require("../../config/Collection")

const contactInquirySchema = new mongoose.Schema({
    contact_inquiry_name:{type:String},
    contact_inquiry_contact:{type:Number,required:[true,"Contact Number  is Required field"]},
    contact_inquiry_message:{type:String},
    contact_inquiry_createdate:{type:String},
},
{timestamps:true}
)

const ContactInquiryModel = mongoose.model(Collection.Contact_Inquiry,contactInquirySchema)



module.exports = ContactInquiryModel

