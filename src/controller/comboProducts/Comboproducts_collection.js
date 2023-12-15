const Constent = require("../../constent/Constent");
const ComboModel = require("../../model/comboProducts/comboProducts_model");
const ProductModel = require("../../model/productManagement/product_model");
exports.addComboProduct = async (req, res) => {
    try {
        const data = req.body;
        console.log(data)
        const addItem = {
            product_name: data.combo_name,
            product_qty: data.combo_qty,
            product_mrp: data.combo_mrp,
            product_discount: data.combo_discount,
            product_price: data.combo_price,
            product_retail_price: data.combo_retail_price,
            product_gst: data.combo_gst,
            product_hsn_code: data.combo_hsn_code,
            product_weight: data.combo_weight,
            product_descrption: data.combo_descrption,
            products:data.products,
            product_small_descrption: data.combo_small_descrption,
        }
        const addCombo_Product_mongo = await ComboModel.create(addItem)
        if (addCombo_Product_mongo) {
            res.json({
                success:true,
                message: "Product Added Successfully",
                
            })
        } else {
            res.json({
                success: false,
                message: "Error"
            })
        }
    } catch (error) {
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
exports.deleteComboProduct = async (req, res) => {
    try {
        const product_id = req.params.product_id
        const delete_mongo = await ComboModel.deleteOne({ _id: product_id })
        if (delete_mongo.deletedCount > 0) {
            res.json({
                status: "success",
                message: "Product Delete Succsssfully"
            })
        }
        else {
            res.json({
                status: "Failed",
                message: "Delete failed"
            })
        }
    }
    catch (error) {
        const resError = {}
        resError.status = "Failed"
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
exports.updateProductImages=async(req,res)=>{
    const product_id = req.params.product_id
    console.log("files",req.files)
    const updateData={
        product_images:req.files.map(ele=>ele.filename)
    }
    const update_mongo = await ComboModel.updateOne({ _id: product_id }, updateData)
    if(update_mongo){
        res.json({
            success:true,
            message:"Images Upload Successfully"
        })
    }
    else{
        res.json({
            success:false,
            message:"Something went wrong"
        })
    }
}
exports.updateFeaturedImage=async(req,res)=>{
    const combo_id = req.params.combo_id
    const updateData={
        featured_image:req.file.filename
    }
    const update_mongo = await ComboModel.updateOne({ _id: combo_id }, updateData)
    if(update_mongo){
        res.json({
            status:"success",
            message:"Featured Image Upload Successfully"
        })
    }
}
exports.singleComboProduct = async (req, res) => {
    try {
        const product_id = req.params.product_id
        console.log(product_id)
        const product = await ComboModel.findOne({ _id: product_id }).populate({
            path: 'products',
            select: "product ",
            populate: {
              path: 'product',
              model: ProductModel,
              select:"product_name product_mrp product_price featured_image"
            }
          });
         product.featured_image = `${Constent.IMAGE_HOST}${product.featured_image}`
         product.product_images=product.product_images.map(ele=>`${Constent.IMAGE_HOST}${ele}`)
         product.products.map(ele=>ele.product.featured_image = `${Constent.IMAGE_HOST}${ele.product.featured_image}`)
        if (product) {
            res.json({
                status:true,
                message: "Product Found Successfully",
                product: product
            })
        }
        else {
            res.json({
                status:false,
                message: "Product not Found"
            })
        }
    }
    catch (error) {
        res.json({
            status:false,
            message:"Something went Wrong"
        })
    }
}
exports.allComboProduct = async (req, res) => {
    try {
        const combo_products = await ComboModel.find({})
         combo_products.map(ele =>
            ele.featured_image = `${Constent.IMAGE_HOST}${ele.featured_image}`
        )
        if (combo_products) {
            res.json({
                status:true,
                message: "Combo Products Founded Successfully",
                combo_products: combo_products
            })
        }
        else {
            res.json({
                status:false,
                message: "Combo Products Not Found"
            })
        }
    }
    catch (error) {
        res.json({
            status:false,
            message: "Error"
        })
    }
}
exports.updateComboProduct = async (req, res) => {
    try {
        const data = req.body;
        const combo_id = req.params.combo.id
        const update_data = {
          product_name: data.product_name,
          product_qty: data.product_qty,
          product_mrp: data.product_mrp,
          product_discount: data.product_discount,
          product_price: data.product_price,
          product_retail_price: data.product_retail_price,
          product_gst: data.product_gst,
          product_hsn_code: data.product_hsn_code,
          product_weight: data.product_weight,
          product_descrption: data.product_descrption,
          product_small_descrption: data.product_small_descrption,
        }
        const update_mongo = await ComboModel.updateOne({ _id: combo_id }, update_data)
        if (update_mongo) {
            res.json({
                status:true,
                message: "Combo Updated Successfully",
                updateData: update_mongo
            })
        }
        else {
            res.json({
                status: false,
                message: "Something Went Wrong"
            })
        }
    }
    catch (error) {
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