const Constent = require("../../constent/Constent")
const ProductModel = require("../../model/productManagement/product_model")

exports.productSearch = async (req, res) => {
    try {
        const search = req.body
        const query = {
            product_name: search.product_name
            

        }
        const searching_product = await ProductModel.find({ product_name: { $regex: new RegExp(query.product_name, "i") } })
        if (searching_product) {
            res.json({
                status: "sucess",
                searching_product: searching_product
            })
        }
        else {
            res.json({
                states: "fail",
                message: "product not found"
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            states: "error"
        })
    }

}