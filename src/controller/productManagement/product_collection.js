const Constent = require("../../constent/Constent");
const ProductModel = require("../../model/productManagement/product_model");


exports.addProduct = async (req, res) => {
    try {
        if (req.files === undefined || req.files.length === 0) {
            res.json({ error: 'Error: No file selected!' });
          } else {
        const data = req.body;
       
        const addItem = {
            product_name: data.product_name,
            main_shop_by_goal_name:data.main_shop_by_goal_name,
            product_is_featured: data.product_is_featured,
            product_status: data.product_status,
            product_qty: data.product_qty,
            product_stock: data.product_stock,
            product_code: data.product_code,
            product_mrp: data.product_mrp,
            product_discount: data.product_discount,
            product_price: data.product_price,
            product_retail_discount: data.product_retail_discount,
            product_retail_price: data.product_retail_price,
            product_shipping_price: data.product_shipping_price,
            product_gst: data.product_gst,
            product_hsn_codet_name: data.product_hsn_code,
            product_branch: data.product_branch,
            product_category_name: data.product_category_name,
            product_flavour: data.product_flavour,
            product_weight: data.product_weight,
            product_descrption: data.product_descrption,
            product_small_descrption: data.product_small_descrption,
            product_meta_tag_title: data.product_meta_tag_title,
            product_meta_tag_descrption: data.product_meta_tag_descrption,
            product_meta_tag_keywords: data.product_meta_tag_keywords,
            product_tags: data.product_tags,
           
    
        }
        const addProduct_mongo = await ProductModel.create(addItem)

        if (addProduct_mongo) {
            res.json({
                status: "success",
                message: "Add Successfully",
                data:addProduct_mongo
            })
        } else {
            res.json({
                status: "Fail",
                message: "Error"
            })
        }
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
exports.setProductImages=async(req,res)=>{
    const product_id = req.params.product_id
    const updateData={
        product_images:req.files.map(ele=>ele.filename)
    }
    const update_mongo = await ProductModel.updateOne({ _id: product_id }, updateData)
    if(update_mongo){
        res.json({
            status:"success",
            message:"Images Upload Successfully"
        })
    }
}
exports.setFeatureImage=async(req,res)=>{
    const product_id = req.params.product_id
    const updateData={
        featured_image:req.file.filename
    }
    const update_mongo = await ProductModel.updateOne({ _id: product_id }, updateData)
    if(update_mongo){
        res.json({
            status:"success",
            message:"Featured Image Upload Successfully"
        })
    }
}
exports.deleteProduct = async (req, res) => {
    try {
        const product_id = req.params.product_id
        const delete_mongo = await ProductModel.deleteOne({ _id: product_id })
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

exports.singleProduct = async (req, res) => {
    try {
        const product_id = req.params.product_id
        let singleProduct_mongo = await ProductModel.findOne({ _id: product_id })
        singleProduct_mongo.featured_image = `${Constent.IMAGE_HOST}${singleProduct_mongo.featured_image}`
        singleProduct_mongo.product_images =singleProduct_mongo.product_images.map(ele=>`${Constent.IMAGE_HOST}${ele}`)
        if (singleProduct_mongo) {
            res.json({
                status: "success",
                message: "Find  Successfully",
                singleProduct: singleProduct_mongo
            })
        }
        else {
            res.json({
                status: "Failed",
                message: "Not Found"
            })
        }
    }
    catch (error) {
        res.json({
            status: "Failed",
            message: "Error"

        })
    }
}


exports.allProduct = async (req, res) => {
    try {
        let find_mongo_all_products = await ProductModel.find({})

       
       find_mongo_all_products.map(ele=>
            ele.featured_image = `${Constent.IMAGE_HOST}${ele.featured_image}`

      )
        
        const find_mongo = await ProductModel.aggregate( [
            {
                $lookup:{
                    from:"categories",
                    localField:"main_category_name",
                    foreignField:"product_category_name",
                    as:"category_data"
                }   
            }
            // ,
            // {
            //     $unwind:"$category_data"
            // }
        ])


        // const find_mongo = await ProductModel.find({})
       
        if (find_mongo || find_mongo_all_products) {
            res.json({
                status: "success",
                message: "Find  Successfully",
                // productList: find_mongo,
                allProducts:find_mongo_all_products
            })
        }
        else {
            res.json({
                status: "Failed",
                message: "Not Found"
            })
        }
    }
    catch (error) {
        res.json({
            status: "fail",
            message: "Error"

        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const data = req.body;
        const product_id = req.params.product_id



        const update_data = {
             product_name: data.product_name,
            product_is_featured: data.product_is_featured,
            product_status: data.product_status,
            product_qtf: data.product_qtf,
            product_stock: data.product_stock,
            product_code: data.product_code,
            product_mrp: data.product_mrp,
            product_discount: data.product_discount,
            product_price: data.product_price,
            product_retail_discount: data.product_retail_discount,
            product_retail_price: data.product_retail_price,
            product_shipping_price: data.product_shipping_price,
            product_gst: data.product_gst,
            producproduct_hsn_codet_name: data.product_hsn_code,
            product_branch: data.product_branch,
            product_category_name: data.product_category_name,
            product_flavour: data.product_flavour,
            product_weight: data.product_weight,
            product_descrption: data.product_descrption,
            product_small_descrption: data.product_small_descrption,
            product_meta_tag_title: data.product_meta_tag_title,
            product_meta_tag_descrption: data.product_meta_tag_descrption,
            product_meta_tag_keywords: data.product_meta_tag_keywords,
            product_tags: data.product_tags,
          
           

             

        }
        console.log(update_data)
        const update_mongo = await ProductModel.updateOne({ _id: product_id }, update_data)

        if (update_mongo) {
            res.json({
                status: "success",
                message: "Product Update Successfully",
                updateData: update_mongo
            })
        }
        else {
            res.json({
                status: "failed",
                message: "Failed"
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