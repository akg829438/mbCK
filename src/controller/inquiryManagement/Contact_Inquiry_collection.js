const ContactInquiryModel = require("../../model/inquiryManagement/Contact_Inquiry_model");



exports.addContactInquiry = async (req, res) => {
    try {
        const data = req.body;

        const addItem = {
            contact_inquiry_name: data.contact_inquiry_name,
            contact_inquiry_contact: data.contact_inquiry_contact, 
            contact_inquiry_message: data.contact_inquiry_message, 
            contact_inquiry_createdate: data.contact_inquiry_createdate, 
        }
        const addContactInquiry_mongo = await ContactInquiryModel.create(addItem)

        if (addContactInquiry_mongo) {
            res.json({
                status: "success",
                message: "Contact Inquiry Add Successfully"
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

exports.deleteContactInquiry = async (req, res) => {
    try {
        const contactInquiry_id = req.params.contactInquiry_id

        const delete_mongo = await ContactInquiryModel.deleteOne({ _id: contactInquiry_id })
        if (delete_mongo.deletedCount > 0) {
            res.json({
                status: "success",
                message: "Contact Inquiry Delete Succsssfully"
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

exports.allContactInquiry = async (req, res) => {
    try {
        const find_mongo = await ContactInquiryModel.find({})

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
