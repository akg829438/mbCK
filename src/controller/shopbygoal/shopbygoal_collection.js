const Constent = require("../../constent/Constent");
const ShopByGoalModel = require("../../model/shopbygoal/shopbygoal_model");


exports.addShopByGoal = async (req, res) => {
    try {
        const data = req.body;
        const shop_by_goal_image = req.image_path


        const addItem = {
            shop_by_goal_name: data.shop_by_goal_name,
            main_shop_by_goal_name: data.main_shop_by_goal_name,
            shop_by_goal_description: data.shop_by_goal_description,
            // multer
            shop_by_goal_image:shop_by_goal_image,            
        }
        const addCategory_mongo = await ShopByGoalModel.create(addItem)

        if (addCategory_mongo) {
            res.json({
                status: "success",
                message: "Shop By Goal Add Successfully"
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

exports.deleteShopByGoal = async (req, res) => {
    try {
        const shopByGoal_id = req.params.shopByGoal_id

        const delete_mongo = await ShopByGoalModel.deleteOne({ _id: shopByGoal_id })
        if (delete_mongo.deletedCount > 0) {
            res.json({
                status: "success",
                message: "Shop By Goal Delete Succsssfully"
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

exports.singleShopByGoal = async (req, res) => {
    try {
        const peramname = req.params.shopByGoal_name
        
        // const shopByGoal_id = req.params.shopByGoal_id
        let find_mongo = await ShopByGoalModel.findOne({main_shop_by_goal_name:peramname})
            find_mongo.shop_by_goal_image =  `${Constent.IMAGE_HOST}${find_mongo.shop_by_goal_image}`
        if (find_mongo) {
            res.json({
                status: "success",
                message: "Shop By Goal find Successfully",
                singleShopbygoal: find_mongo
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

exports.allShopByGoalAllProduct = async (req, res) => {
    try {
        const peramname = req.params.shopByGoal_name

        let find_mongo_all = await ShopByGoalModel.find({})

        let find_mongo = await ShopByGoalModel.aggregate([
            { $match:{main_shop_by_goal_name:peramname}},
            {
                $lookup: {
                    from: "all_products",
                    localField: "main_shop_by_goal_name",
                    foreignField: "main_shop_by_goal_name",
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
                shopbygoal: find_mongo,
                shopByGoal:find_mongo_all
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

exports.allShopByGoal = async (req, res) => {
    try {

        let find_mongo_all = await ShopByGoalModel.find({})

        
        find_mongo_all = find_mongo_all.map(ele=>{
            ele.shop_by_goal_image = `${Constent.IMAGE_HOST}${ele.shop_by_goal_image}`
            return ele
        })

        if (find_mongo_all) {
            res.json({
                status: "success",
                message: "find  Successfully",
                shopByGoal:find_mongo_all
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

exports.updateShopByGoal = async (req, res) => {
    try {
        const data = req.body;
        const shop_by_goal_image = req.image_path
        const peramname = req.params.shopByGoal_name


        const update_data = {
            shop_by_goal_name: data.shop_by_goal_name,
            main_shop_by_goal_name: data.main_shop_by_goal_name,
            shop_by_goal_description: data.shop_by_goal_description,
            // multer
            shop_by_goal_image:shop_by_goal_image, 

        }
        const update_mongo = await ShopByGoalModel.updateOne({ main_shop_by_goal_name:peramname }, update_data)

        if (update_mongo) {
            res.json({
                status: "success",
                message: "Shop By Goal Update Successfully",
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
