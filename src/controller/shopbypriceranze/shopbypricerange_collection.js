const ProductModel = require("../../model/productManagement/product_model")
const Constent = require("../../constent/Constent");

exports.selectedShopByGoalPrice = async (req, res) => {

    const minimumAmount = req.params.minimumAmount
    let find_mongo = await ProductModel.find({product_mrp:minimumAmount
    })

    
    try {
        
         find_mongo.map((ele)=>
            ele.featured_image = `${Constent.IMAGE_HOST}${ele.featured_image}`
        )
        if (find_mongo) {
            res.json({
                status: "success",
                message: "Find  Successfully",
                shop_by_goal_price : find_mongo
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