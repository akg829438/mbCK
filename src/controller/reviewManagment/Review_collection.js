const ReviewModel = require("../../model/reviewManagment/Review_model");
const UserLoginModel = require("../../model/userLoginPart/user_modal");

exports.addReview = async (req, res) => {
    const userId =  req.user.userId;
    try {   
        console.log(req.body)
        const data = req.body;
       
        const existingReview = await ReviewModel.findOne({user_id: userId, product_id: data.productId});
        if(existingReview){
            return res.json({
                status: false,
                message: "You have already reviewd this product"
            })
        }
        const add_data = {
            review_rate: data.rate,
            review_title: data.title,
            review_description: data.description,
            product_id: data.productId,
            user_id: userId,  
            published_date: new Date()  
            
        }
        const addreview_mongo = await ReviewModel.create(add_data)
        if (addreview_mongo) {
            res.json({
                status: true,
                message: "Review Add Successfully"
            })
        } else {
            res.json({
                status: false,
                message: "Something Went Wrong"
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

exports.getUserReview = async (req, res) => {
   
    try{
        const userId =  req.user.userId;
      
        const productId = req.params.productId;
      
        const userReview = await ReviewModel.findOne({user_id: userId,product_id: productId}).populate({  path: 'user_id',select:'name',model: UserLoginModel,});
        console.log(userReview)
        if(userReview){
            return res.json({
                status: true,
                message: "User review found",
                userReview: userReview
            })
        }
        return res.json({
            status: false,
            message: "User review not found",
        })
    }
    catch(error){
        res.status(500).json({
            status: false,
            message: "Something went wrong",
        
        })
    }
}
exports.getProductReviews = async (req, res) => {
    try{
        const productId = req.params.productId;
        const productReviews = await ReviewModel.find({product_id: productId}).populate({  path: 'user_id',select:'name',model: UserLoginModel,});
        if(productReviews){
            return res.json({
                status: true,
                message: "Product reviews found",
                productReviews: productReviews
            })
        }
        return res.json({
            status: false,
            message: "Product reviews not found",
        })
    }
    catch(e){
        res.json({
            status: false,
            message: "Something went wrong",
        
        })
    
    }
}
exports.allReview = async (req, res) => {
    try {
        let find_mongo_all_products = await ReviewModel.find({})
        if (find_mongo_all_products) {
            res.json({
                status: "success",
                message: "Find  Successfully",
                // productList: find_mongo,
                allReview:find_mongo_all_products
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

exports.deleteReview = async (req, res) => {
    try {
        const review_id = req.params.review_id
        const delete_mongo = await ReviewModel.deleteOne({ _id: review_id })
        if (delete_mongo.deletedCount > 0) {
            res.json({
                status: "success",
                message: "Product Delete Succsssfully"
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