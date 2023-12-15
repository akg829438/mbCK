const EmployeeModel = require("../../model/userManagement/employ_model");



exports.addEmployee = async (req, res) => {
    try {
        const data = req.body;

        const addItem = {
            employee_name: data.employee_name,
            employee_email: data.employee_email, 
            employee_phonenumber: data.employee_phonenumber, 
            employee_address: data.employee_address, 
            employee_dob: data.employee_dob, 
            employee_city: data.employee_city, 
            employee_status: data.employee_status, 
        }
        const addEmployee_mongo = await EmployeeModel.create(addItem)

        if (addEmployee_mongo) {
            res.json({
                status: "success",
                message: "Employee Add Successfully"
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

exports.allEmployee = async (req, res) => {
    try {
        const find_mongo = await EmployeeModel.find({})

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

exports.updateEmployee = async (req, res) => {
    try {
        const data = req.body;
        const employee_id = req.params.employee_id


        const update_data = {
            employee_name: data.employee_name,
            employee_email: data.employee_email, 
            employee_phonenumber: data.employee_phonenumber, 
            employee_address: data.employee_address, 
            employee_dob: data.employee_dob, 
            employee_city: data.employee_city, 
            employee_status: data.employee_status, 

        }
        const update_mongo = await EmployeeModel.updateOne({ _id: employee_id }, update_data)

        if (update_mongo) {
            res.json({
                status: "success",
                message: "Employee update Successfully",
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
