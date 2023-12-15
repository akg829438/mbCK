const CouponModel = require("../../model/couponManagement/coupon_model");



exports.addCoupon = async (req, res) => {
    try {
        const data = req.body;

        const addItem = {
            coupon_code: data.coupon_code,
            coupon_used_type: data.coupon_used_type, 
            coupon_discount_value: data.coupon_discount_value, 
            coupon_valid_upto: data.coupon_valid_upto, 
            coupon_minumum_amount_require: data.coupon_minumum_amount_require, 
            coupon_max_discount_value: data.coupon_max_discount_value, 
            coupon_title: data.coupon_title, 
            coupon_description: data.coupon_description, 
            coupon_product_id: data.coupon_product_id,
        }
        const addCoupne_mongo = await CouponModel.create(addItem)

        if (addCoupne_mongo) {
            res.json({
                status: "success",
                message: "Coupon Add Successfully"
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

exports.allCoupon = async (req, res) => {
    try {
        const find_mongo = await CouponModel.find({})
        // console.log(find_mongo)

        if (find_mongo) {
            res.json({
                status: "success",
                message: "Find  Successfully",
                coupneList: find_mongo
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

exports.deletedCoupon = async (req, res) => {
    try {
        const coupon_id = req.params.coupon_id

        const delete_mongo = await CouponModel.deleteOne({ _id: coupon_id })
        if (delete_mongo.deletedCount > 0) {
            res.json({
                status: "success",
                message: " Coupon Delete Succsssfully"
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

exports.updatedcoupon = async (req, res) => {
    try {
        const data = req.body;
        const coupon_id = req.params.coupon_id



        const update_data = {
            coupon_code: data.coupon_code,
            coupon_used_type: data.coupon_used_type, 
            coupon_discount_value: data.coupon_discount_value, 
            coupon_valid_upto: data.coupon_valid_upto, 
            coupon_minumum_amount_require: data.coupon_minumum_amount_require, 
            coupon_max_discount_value: data.coupon_max_discount_value, 
            coupon_title: data.coupon_title, 
            coupon_description: data.coupon_description, 
            coupon_product_id: data.coupon_product_id,
        }
        // console.log(update_data)
        const update_mongo = await CouponModel.updateOne({ _id: coupon_id }, update_data)

        if (update_mongo) {
            res.json({
                status: "success",
                message: "coupon Update Successfully",
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