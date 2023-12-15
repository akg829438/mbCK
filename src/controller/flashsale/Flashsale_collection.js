const Constent = require("../../constent/Constent");
const DiscountUnderTimeModel = require("../../model/flashsale/Flashsale_model");
const ProductModel = require("../../model/productManagement/product_model");


exports.addDiscountUnderTime = async (req, res) => {
    try {
        const data = req.body;
        const currentDateTime = new Date();

        const datatatat = new Date().getTime();



        // console.log(formattedDateTime);


        // end days

        const days = data.endDayy;

        const millisecondsInADay = 24 * 60 * 60 * 1000;
        const totalMilliseconds = days * millisecondsInADay;


        const addItem = {
            flatSale_id: data.flatSale_id,
            startingTime: datatatat,
            endDayy: totalMilliseconds,
            discount: data.discount,
        }

        const addDiscountUnderTime_mongo = await DiscountUnderTimeModel.create(addItem)

        if (addDiscountUnderTime_mongo) {
            res.json({
                status: "success",
                message: "Add discount Under Time Successfully",
                data: addDiscountUnderTime_mongo
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




exports.allDiscountUnderTime = async (req, res) => {
    try {
        let flashSaleData = await DiscountUnderTimeModel.aggregate([
            {
                $lookup: {
                    from: "all_products",
                    localField: "flatSale_id",
                    foreignField: "_id",
                    as: "product"
                }

            }
            ,
            {
                $unwind: "$product"
            }
        ])
         

        flashSaleData = flashSaleData.map(ele => {
            ele.product.featured_image = `${Constent.IMAGE_HOST}${ele.product.featured_image}`
            return ele
        })

        if (flashSaleData) {
            res.json({
                status: "success",
                message: "Find  Successfully",

                allDiscountUnderTime: flashSaleData


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
            status: "fail",
            message: "Error"

        })
    }
}

exports.updateDiscountUnderTime = async (req, res) => {
    try {
        const data = req.body;
        const flashSale_id = req.params.flashSale_id



        const update_data = {
            product_id: data.product_id,
            startingTime: data.startingTime,
            endTime: data.endTime,
            discount: data.discount,

        }

        const update_mongo = await DiscountUnderTimeModel.updateOne({ _id: flashSale_id }, update_data)

        if (update_mongo) {
            res.json({
                status: "success",
                message: "Discount Under Time Update Successfully",
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



exports.deleteDiscountUnderTime = async (req, res) => {
    try {
        const flashSale_id = req.params.flashSale_id
        const delete_mongo = await DiscountUnderTimeModel.deleteOne({ _id: flashSale_id })
        if (delete_mongo.deletedCount > 0) {
            res.json({
                status: "success",
                message: " 1 Discount Under Time Delete Succsssfully"
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

exports.singleDiscountUnderTime = async (req, res) => {
    try {
        const flashSale_id = req.params.flashSale_id
        console.log(flashSale_id);
        let singleDiscount_mongo = await DiscountUnderTimeModel.findOne({ _id: flashSale_id }).populate({path:"flatSale_id",model:ProductModel})

        singleDiscount_mongo.flatSale_id.product_images =singleDiscount_mongo.flatSale_id.product_images.map(ele=>`${Constent.IMAGE_HOST}${ele}`)

        
        // singleProduct_mongo.product_image =  `${Constent.IMAGE_HOST}${singleDiscount_mongo.product_image}`
        if (singleDiscount_mongo) {
            res.json({
                status: "success",
                message: "Find  Successfully",
                singleDiscount_mongo: singleDiscount_mongo
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
            status: "Failed",
            message: "Error"

        })
    }
}


