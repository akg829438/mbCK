const mongoose = require("mongoose")
require("../../config/product_db")
const Collection = require("../../config/Collection")


const shopbygoalSchema = new mongoose.Schema({
  shop_by_goal_name:{type:String},
  main_shop_by_goal_name:{type:String},
  shop_by_goal_description:{type:String},
  shop_by_goal_image:{type:String}, 
},
{timestamps:true}
)



const ShopByGoalModel = mongoose.model(Collection.ShopByGoal,shopbygoalSchema)



module.exports = ShopByGoalModel

