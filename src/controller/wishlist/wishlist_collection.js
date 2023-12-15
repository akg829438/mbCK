const Constent = require("../../constent/Constent");
const WishlistModel = require("../../model/wishlist/wishlist_model");
const Product =require("../../model/productManagement/product_model")
exports.getWishlist = async (req, res) => {
    try {
      const userId = req.user.userId;
      let wishlist = await WishlistModel.findOne({ user: userId }).populate({
        path: 'items',
        select: "product",
        populate: {
          path: 'product',
          model: Product,
        }
      });
      wishlist.items.map((ele) =>
        ele.product.featured_image = `${Constent.IMAGE_HOST}${ele.product.featured_image}`
      )
      res.json({
        success: true,
        wishlistItems: wishlist.items
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
exports.addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        console.log(productId)
        const wishlist = await WishlistModel.findOne({ user: req.user.userId });
        const index = wishlist.items.indexOf(item => item.product.toString() === productId);
        if(index==-1)
        {wishlist.items.push({ product: productId});
         await wishlist.save();
        res.json({ success: true, message: 'Item added to Wishlist' });
       }
       else{
       res.json({ success:false , message: 'Item Already Added in Wishlist' });
       }
      }
      catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
}
exports.removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        console.log(productId)
        const wishlist = await WishlistModel.findOne({ user: req.user.userId });
        const index = wishlist.items.findIndex(item => item.product.toString() === productId);
        console.log(index)
        if(index>-1){
        wishlist.items.splice(index, 1)
        await wishlist.save();
        res.json({ success: true, message: 'Item removed From wishlist' });
        }
        else{
            res.json({success:false,message:"Item already remnoved from wishlist"})
        }
        }
       catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    // try {
    //     const wishlist_id = req.params.wishlist_id
    //     const delete_mongo = await WishlistModel.deleteOne({ wishlist_id: wishlist_id })
    //     if (delete_mongo.deletedCount > 0) {
    //         res.json({
    //             status: "success",
    //             message: "wishlist delete succsssfully"
    //         })
    //     }
    //     else {
    //         res.json({
    //             status: "Failed",
    //             message: "Delete failed"
    //         })
    //     }
    // }
    // catch (error) {
    //     const resError = {}
    //     resError.status = "Failed"
    //     if (error.name === "ValidationError") {
    //         let errors = {};
    //         Object.keys(error.errors).forEach((key) => {
    //             errors[key] = error.errors[key].message;
    //         });
    //         resError.error = errors;
    //     }
    //     res.json(resError)
    // }
} 