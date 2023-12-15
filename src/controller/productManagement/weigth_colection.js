const WeightModel = require("../../model/productManagement/weigth_model");


exports.addWeight = async (req, res) => {
    try {
        const data = req.body;

        const addItem = {
            weight_kg: data.weight_kg,
            weight_lb: data.weight_lb, 
            weight_status: data.weight_status, 
        }
        const addFWeigth_mongo = await WeightModel.create(addItem)

        if (addFWeigth_mongo) {
            res.json({
                status: "success",
                message: "Weight Add Successfully"
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

exports.deleteWeight = async (req, res) => {
    try {
        const weigth_id = req.params.weigth_id

        const delete_mongo = await WeightModel.deleteOne({ _id: weigth_id })
        if (delete_mongo.deletedCount > 0) {
            res.json({
                status: "success",
                message: "Weigth Delete Succsssfully"
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

exports.allWeight = async (req, res) => {
    try {
        const find_mongo = await WeightModel.find({})

        if (find_mongo) {
            res.json({
                status: "success",
                message: "Find  Successfully",
                weigthList: find_mongo
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

exports.updateWeight = async (req, res) => {
    try {
        const data = req.body;
        const weigth_id = req.params.weigth_id

        const update_data = {
            weight_kg: data.weight_kg,
            weight_lb: data.weight_lb, 
            weight_status: data.weight_status,
        }
        const update_mongo = await WeightModel.updateOne({ _id: weigth_id }, update_data)

        if (update_mongo) {
            res.json({
                status: "success",
                message: "Weigth Update Successfully",
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
