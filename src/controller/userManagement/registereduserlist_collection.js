const RegisteredUserListModel = require("../../model/userManagement/registereduserlist_model");



exports.addRegisteredUser = async (req, res) => {
    try {
        const data = req.body;

        const addItem = {
            registered_user_name: data.registered_user_name,
            registered_user_email: data.registered_user_email, 
            registered_user_phonenumber: data.registered_user_phonenumber, 
            registered_user_address: data.registered_user_address, 
            registered_user_date_time: data.registered_user_date_time,  
        }
        const addEmployee_mongo = await RegisteredUserListModel.create(addItem)

        if (addEmployee_mongo) {
            res.json({
                status: "success",
                message: "Registered Successfully"
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


exports.allRegisteredUser = async (req, res) => {
    try {
        const find_mongo = await RegisteredUserListModel.find({})

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

exports.actionRegisteredUser = async (req, res) => {
    try {
       
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
