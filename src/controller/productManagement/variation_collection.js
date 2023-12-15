
const VariationModel = require('../../model/productManagement/variation_model');
exports.addVariation = async (req, res) => {
    try{
        const slug=req.body.slug;
        const items=req.body.items;
        const variation=new VariationModel({slug:slug,items:items});
        await variation.save();
        res.json({
            status:"success",
            message:"Variation added Successfully"
        })

    }
   catch(e){
         res.json({
              status:"fail",
              message:"Error"
         })
    
   }
}
exports.updateVaraition=async(req,res)=>{
    try{
        const variationId=req.params.variation_id
        const productId=req.body.productId;
        const flavour=req.body.flavour;
        const variation=await VariationModel.findOne({_id:variationId});
        variation.items.push({productId:productId,flavour:flavour});
    }
    catch(e){
        res.json({
            status:"fail",
            message:"Error"
        })
    }
}
exports.getVariation=async(req,res)=>{
    try{
        const slug=req.params.slug;
        const variation=await VariationModel.findOne({slug:slug});
        if(variation)
        res.json({
            status:true,
            message:"Variation found",
            variation:variation.items
        })
        else
        res.json({
        status:false,
        message:"No variation found"
        })
    }
    catch(e){
        res.json({
            status:false,
            message:"Error"
        })
    }
}