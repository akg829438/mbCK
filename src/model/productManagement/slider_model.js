const mongoose = require('mongoose')
const Collection = require('../../config/Collection')
require('../../config/product_db')


const sliderSchema = new mongoose.Schema({
    slider_image:{type:String},
    slider_Title:{type:String}
},
{timestamps:true}
)

const SliderModel = mongoose.model(Collection.Slider,sliderSchema)
module.exports = SliderModel;