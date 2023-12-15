const Constent = require("../../constent/Constent");
const CategoryModel = require("../../model/productManagement/category_model");


exports.addCategory = async (req, res) => {
    try {
        const data = req.body;
     const category_image = req.image_path


        const addItem = {
            category_name: data.category_name,
            main_category_name: data.main_category_name,
            category_descrption: data.category_descrption,
            category_goal: data.category_goal,
            category_status: data.category_status,
            category_menu_link: data.category_menu_link,
            category_artical: data.category_artical,
            category_meta_tag_title: data.category_meta_tag_title,
            category_meta_tag_descrption: data.category_meta_tag_descrption,
            category_meta_tag_keywords: data.category_meta_tag_keywords,

            // multer

            category_image:category_image,
            
        }
        const addCategory_mongo = await CategoryModel.create(addItem)

        if (addCategory_mongo) {
            res.json({
                status: "success",
                message: "Category Add Successfully"
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

exports.deleteCategory = async (req, res) => {
    try {
        const category_id = req.params.category_id

        const delete_mongo = await CategoryModel.deleteOne({ _id: category_id })
        if (delete_mongo.deletedCount > 0) {
            res.json({
                status: "success",
                message: "category Delete Succsssfully"
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

exports.singleCategory = async (req, res) => {
    try {
        const category_id = req.params.category_id
        const singleCategory_mongo = await CategoryModel.findOne({ _id: category_id })
        if (singleCategory_mongo) {
            res.json({
                status: "success",
                message: "Find  Successfully",
                singleCategory: singleCategory_mongo
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

exports.allCategory = async (req, res) => {
    try {
        let find_mongo = await CategoryModel.find({})
        
         find_mongo.map((ele)=>
            ele.category_image = `${Constent.IMAGE_HOST}${ele.category_image}`
        )
        if (find_mongo) {
            res.json({
                status: "success",
                message: "Find  Successfully",
                CategoryList: find_mongo
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

exports.updateCategory = async (req, res) => {
    try {
        const data = req.body;
     const category_image = req.image_path
        const category_id = req.params.category_id


        const update_data = {
            category_name: data.category_name,
            main_category_name: data.main_category_name,
            category_descrption: data.category_descrption,
            category_goal: data.category_goal,
            category_status: data.category_status,
            category_menu_link: data.category_menu_link,
            category_artical: data.category_artical,
            category_meta_tag_title: data.category_meta_tag_title,
            category_meta_tag_descrption: data.category_meta_tag_descrption,
            category_meta_tag_keywords: data.category_meta_tag_keywords,

          

            category_image:category_image,

        }
        const update_mongo = await CategoryModel.updateOne({ _id: category_id }, update_data)

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
