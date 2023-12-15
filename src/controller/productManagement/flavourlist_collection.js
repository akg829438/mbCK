const FlavourModel = require("../../model/productManagement/flavourlist_model");


exports.addFlavour = async (req, res) => {
    try {
        const data = req.body;

        const addItem = {
            flavour_name: data.flavour_name,
            flavour_status: data.flavour_status, 
        }
        const addFlavour_mongo = await FlavourModel.create(addItem)

        if (addFlavour_mongo) {
            res.json({
                status: "success",
                message: "Flavour Add Successfully"
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

exports.deleteFlavour = async (req, res) => {
    try {
        const flavour_id = req.params.flavour_id

        const delete_mongo = await FlavourModel.deleteOne({ _id: flavour_id })
        if (delete_mongo.deletedCount > 0) {
            res.json({
                status: "success",
                message: "Flavour Delete Succsssfully"
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

exports.allFlavour = async (req, res) => {
    try {
        const find_mongo = await FlavourModel.find({})

        if (find_mongo) {
            res.json({
                status: "success",
                message: "Find  Successfully",
                flavourList: find_mongo
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

exports.updateFlavour = async (req, res) => {
    try {
        const data = req.body;
        const flavour_id = req.params.flavour_id

        const update_data = {
            flavour_name: data.flavour_name,
            flavour_status: data.flavour_status, 
        }
        const update_mongo = await FlavourModel.updateOne({ _id: flavour_id }, update_data)

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
