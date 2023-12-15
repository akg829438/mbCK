const mongoose = require("mongoose")
const variationSchema = new mongoose.Schema({
    slug:{type:String },
    items:[
        {
            product:{type:mongoose.Schema.Types.ObjectId,ref:"Product"},
            flavour:String
        }]
   
  });

    const VariationModel = mongoose.model("Variation",variationSchema)
    module.exports= VariationModel;