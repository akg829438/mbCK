const SettingModel = require("../../model/settingManagement/setting_model");


exports.addSetting = async (req, res) => {
    try {
        const data = req.body;

        const addItem = {
            delivery_amount: data.delivery_amount,
            contact_email: data.contact_email, 
            contact_number: data.contact_number, 
            twiter: data.twiter, 
            facebook: data.facebook, 
            google: data.google, 
            instagram: data.instagram, 
            linkedin: data.linkedin, 
            YouTube: data.YouTube, 
            whatsapp_api: data.whatsapp_api, 
            whatsapp_number: data.whatsapp_number, 
            address: data.address, 
            live_chat_code: data.live_chat_code, 
            google_analytic_code: data.google_analytic_code, 
        }
        const addSetting_mongo = await SettingModel.create(addItem)

        if (addSetting_mongo) {
            res.json({
                status: "success",
                message: "setting Add Successfully"
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

exports.settingShow = async (req, res) => {
    try {
        const find_mongo = await SettingModel.find({})

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
                message: "Error"
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

exports.updateSetting = async (req, res) => {
    try {
        const data = req.body;
        const setting_id = req.params.setting_id

        const update_data = {
            delivery_amount: data.delivery_amount,
            contact_email: data.contact_email, 
            contact_number: data.contact_number, 
            twiter: data.twiter, 
            facebook: data.facebook, 
            google: data.google, 
            instagram: data.instagram, 
            linkedin: data.linkedin, 
            YouTube: data.YouTube, 
            whatsapp_api: data.whatsapp_api, 
            whatsapp_number: data.whatsapp_number, 
            address: data.address, 
            live_chat_code: data.live_chat_code, 
            google_analytic_code: data.google_analytic_code,
        }
        const update_mongo = await SettingModel.updateOne({ _id: setting_id }, update_data)

        if (update_mongo) {
            res.json({
                status: "success",
                message: "setting Update Successfully",
                updateData: update_mongo
            })
        }
        else {
            res.json({
                status: "failed",
                message: "Error"
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
