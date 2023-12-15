const Constent = require("../../constent/Constent");
const SliderModel = require("../../model/productManagement/slider_model");

exports.addSlider = async(req,res)=>{
    try{
     const data = req.body;
     const slider_image = req.image_path
     const SliderData = {
        slider_image:slider_image,
         slider_Title:data.slider_Title
     }
     
 
     const Slider_model = await SliderModel.create(SliderData)
   
     if(Slider_model){
         res.json({
             status: "success",
             message: "Slider Image Add Successfully"
         })
     }else{
         res.json({
             status: "sucess",
             message: "Error"
         })
     }
    }catch(error){
        const resError = {}
        resError.status = "failed"
        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            resError.error = errors;
        }
        res.json(resError)
    }
 }
 
 exports.sliderShow = async(req,res)=>{
    try{
     const data = req.body;
     let slider_mongo= await SliderModel.find({})
     slider_mongo.map((ele=>{
        ele.slider_image = `${Constent.IMAGE_HOST}${ele.slider_image}`
    }))
     if(slider_mongo){
         res.json({
             status: "success",
             message: "Slider Image find Successfully",
             Sliders:slider_mongo
         })
     }else{
         res.json({
             status: "fail",
             message: "Error"
         })
     }
    }catch(error){
        const resError = {}
        resError.status = "failed"
        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            resError.error = errors;
        }
        res.json(resError)
    }
 }

 exports.sliderDelete = async (req,res)=> {
    try{
     const Slider_id = req.params.Slider_id
     const del = await SliderModel.deleteOne({_id:Slider_id})
     if(del.deletedCount>0){
         res.json({
             status:"success",
             message:"slider Delete Succsssfully"
         })
     }
     else{
         res.json({
             status:"failed",
             message:"Delete failed"
         })
     }
    }
   catch(error){
    const resError = {}
    resError.status = "failed"
    if (error.name === "ValidationError") {
        let errors = {};
        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });
        resError.error = errors;
    }
    res.json(resError)
   }
}

exports.slider_update = async(req,res) =>{
    try{
            const reqData = req.body;
            const slider_image = req.image_path
            const {Slider_id} = req.params
            const slider_update = {
                slider_Title :reqData.slider_Title,
                slider_image : slider_image
            }
            console.log(slider_update)
            const update_mongo = await SliderModel.updateOne({_id:Slider_id},slider_update)
            if(update_mongo){
                res.json({
                    status:"success",
                    message:"Slider Update Successfully",
                    updateData:update_mongo
                })}
            else{
                res.json({
                    status:"failed",
                    message:"update fail"
                })}
    }
    catch(error){
        console.log(error)
        const resError = {}
        resError.status = "failed"
        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
              errors[key] = error.errors[key].message;
            });
            resError.error = errors;
          }
        res.json(resError)
    }
}