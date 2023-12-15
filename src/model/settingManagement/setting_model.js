const mongoose = require('mongoose')
const Collection = require('../../config/Collection')
require('../../config/product_db')


const settingSchema = new mongoose.Schema({
    delivery_amount:{type:Number},
    contact_email:{type:String},
    contact_number:{type:Number},
    twiter:{type:String},
    facebook:{type:String},
    google:{type:String},
    instagram:{type:String},
    linkedin:{type:String},
    YouTube:{type:String},
    whatsapp_api:{type:String},
    whatsapp_number:{type:Number},
    address:{type:String},
    live_chat_code:{type:String},
    google_analytic_code:{type:String},
},
{timestamps:true}
)

const SettingModel = mongoose.model(Collection.Setting,settingSchema)
module.exports = SettingModel;