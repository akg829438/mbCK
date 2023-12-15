const Constent = require("../../constent/Constent");
const ShopByGoalModel = require("../../model/shopbygoal/shopbygoal_model");
const TrandingProductModel = require("../../model/trandingProduct/trandingProduct_model");


exports.addTrandingProduct = async (req, res) => {
    try {
        const data = req.body;
        const trandingProduct_image = req.image_path


        const addItem = {
            trandingProduct_name: data.trandingProduct_name,
            mainTrandingProduct_name: data.mainTrandingProduct_name,
            mainTrandingProduct_description: data.mainTrandingProduct_description,
            // multer
            trandingProduct_image:trandingProduct_image,            
        }
        const trandingProduct_mongo = await TrandingProductModel.create(addItem)

        if (trandingProduct_mongo) {
            res.json({
                status: "success",
                message: "Tranding Product Add Successfully"
            })
        } else {
            res.json({
                status: "Fail",
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

exports.deleteTrandingProduct = async (req, res) => {
    try {
        const trandingProduct_id = req.params.trandingProduct_id

        const delete_mongo = await TrandingProductModel.deleteOne({ _id: trandingProduct_id })
        if (delete_mongo.deletedCount > 0) {
            res.json({
                status: "success",
                message: "TRanding Product Delete Succsssfully"
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

exports.singleTrandingProduct = async (req, res) => {
    try {
        const peramname = req.params.trandingProduct_name
        
        // const shopByGoal_id = req.params.shopByGoal_id
        let find_mongo = await TrandingProductModel.findOne({mainTrandingProduct_name:peramname})
            find_mongo.trandingProduct_image =  `${Constent.IMAGE_HOST}${find_mongo.trandingProduct_image}`
        if (find_mongo) {
            res.json({
                status: "success",
                message: "TRanding Product find Successfully",
                singleTrandingProduct: find_mongo
            })
        }
        else {
            res.json({
                status: "Fail",
                message: "Not Found"
            })
        }
    }
    catch (error) {
        res.json({
            states: "Failed",
            message: "Error"

        })
    }
}

exports.allTrandingAllProduct = async (req, res) => {
    try {
        const peramname = req.params.trandingProduct_name

        let find_mongo_all = await TrandingProductModel.find({})

        let find_mongo = await TrandingProductModel.aggregate([
            { $match:{trandingProduct_name:peramname}},
            {
                $lookup: {
                    from: "all_products",
                    localField: "mainTrandingProduct_name",
                    foreignField: "mainTrandingProduct_name",
                    as: "products"
                }
            },
            {
                $unwind: "$products"
            }
        ])
        find_mongo = find_mongo.map(ele=>{
            ele.products.featured_image = `${Constent.IMAGE_HOST}${ele.products.featured_image}`
            return ele
        })

        if (find_mongo || find_mongo_all) {
            res.json({
                status: "success",
                message: "find  Successfully",
                trandingProduct: find_mongo,
                trandingProduct:find_mongo_all
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
            states: "fail",
            message: "Error"

        })
    }
}

exports.allTrandingAllProduct = async (req, res) => {
    try {

        let find_mongo_all = await TrandingProductModel.find({})

        
        find_mongo_all = find_mongo_all.map(ele=>{
            ele.trandingProduct_image = `${Constent.IMAGE_HOST}${ele.trandingProduct_image}`
            return ele
        })

        if (find_mongo_all) {
            res.json({
                status: "success",
                message: "find  Successfully",
                trandingProduct:find_mongo_all
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
            states: "fail",
            message: "Error"

        })
    }
}

exports.updateTrandingProduct = async (req, res) => {
    try {
        const data = req.body;
        const trandingProduct_image = req.image_path
        const peramname = req.params.trandingProduct_name


        const update_data = {
            trandingProduct_name: data.trandingProduct_name,
            mainTrandingProduct_name: data.mainTrandingProduct_name,
           trandingProduct_description: data.trandingProduct_description,
            // multer
            trandingProduct_image:trandingProduct_image, 

        }
        const update_mongo = await TrandingProductModel.updateOne({ mainTrandingProduct_name:peramname }, update_data)

        if (update_mongo) {
            res.json({
                status: "success",
                message: "Tranding Product Update Successfully",
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











