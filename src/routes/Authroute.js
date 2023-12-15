const express = require('express')
const productrouter = express.Router()
const passport=require('passport')
const { addProduct, deleteProduct, singleProduct, updateProduct, allProduct, setFeatureImage, setProductImages } = require('../controller/productManagement/product_collection')
const { addCategory, updateCategory, allCategory, singleCategory, deleteCategory } = require('../controller/productManagement/category_collection')
const { upload, featureImageUpload, productImagesUpload } = require('../middleware/upload');
const image_upload = require('../middleware/multer_image_midelware');
const { addSlider, sliderShow, sliderDelete, slider_update } = require('../controller/productManagement/slider_collection');
const { addFlavour, deleteFlavour, updateFlavour, allFlavour } = require('../controller/productManagement/flavourlist_collection');
const { addWeight, deleteWeight, updateWeight, allWeight } = require('../controller/productManagement/weigth_colection');
const { addSetting, updateSetting, settingShow } = require('../controller/settingManagement/setting_collection');
const { addContactInquiry, deleteContactInquiry, allContactInquiry } = require('../controller/inquiryManagement/Contact_Inquiry_collection');
const { adminLogin, adminSignup } = require('../controller/adminLoginPart/Admin_Login_collection');
const { addEmployee, updateEmployee, allEmployee } = require('../controller/userManagement/employ_collection');
const { addRegisteredUser, allRegisteredUser } = require('../controller/userManagement/registereduserlist_collection');
const { removeFromCart, getCart, addToCart, setCart, incrementInCart, decrementInCart } = require('../controller/addToCart/addtocart_collection');
const { addCoupon, allCoupon, deletedCoupon } = require('../controller/couponManagement/coupon_collection');
const {addReview,allReview,deleteReview, getUserReview, getProductReviews}=require('../controller/reviewManagment/Review_collection') 
const { addShopByGoal, updateShopByGoal, allShopByGoal, singleShopByGoal, deleteShopByGoal, allShopByGoalAllProduct } = require('../controller/shopbygoal/shopbygoal_collection');
const { selectedShopByGoalPrice } = require('../controller/shopbypriceranze/shopbypricerange_collection');
const { verify, createOrder, getOrderDetails } = require('../controller/paymentManagement/payment_collection');
const { userVeryfieOtp, userSendOtp, userResendOtp } = require('../controller/userLoginPart/phoneNumber_colletion');
const { authmidleware } = require('../middleware/auth_midelware');
const { addToWishlist, removeFromWishlist, getWishlist } = require('../controller/wishlist/wishlist_collection');
const { addComboProduct, deleteComboProduct, singleComboProduct, allComboProduct, updateComboProduct } = require('../controller/comboProducts/Comboproducts_collection');
const { allDiscountUnderTime, addDiscountUnderTime, updateDiscountUnderTime, deleteDiscountUnderTime, singleDiscountUnderTime } = require('../controller/flashsale/Flashsale_collection');
const { productSearch } = require('../controller/productSearching/searching_collection')
const { getAddresses, addAddress, updateAddress, deleteAddress, setDefaultAddress, getDefaultAddress, getAddresseById } = require('../controller/addressManagment/address_collection')
const { addVariation, updateVaraition, getVariation } = require('../controller/productManagement/variation_collection')
const { deleteTrandingProduct, singleTrandingProduct, allTrandingAllProduct, addTrandingProduct, updateTrandingProduct } = require('../controller/trandingProduct/trandingProduct_collection')


// payment

productrouter.post("/paymentOrderCreate", createOrder)


// admin login

productrouter.post('/login', adminLogin)
productrouter.post('/signup', adminSignup)


// shop by goal

productrouter.post("/addShopByGoal", image_upload.single('shop_by_goal_image'), addShopByGoal)
productrouter.put("/updateShopByGoal/:shopByGoal_name", image_upload.single('shop_by_goal_image'), updateShopByGoal)
productrouter.get("/allShopByGoalProduct/:shopByGoal_name", allShopByGoalAllProduct)
productrouter.get("/allShopByGoal", allShopByGoal)
productrouter.get("/singleShopByGoal/:shopByGoal_name", singleShopByGoal)
productrouter.delete("/deleteShopByGoal/:shopByGoal_id", deleteShopByGoal)

// Tranding Products 


productrouter.post("/addTrandingProduct", image_upload.single('trandingProduct_image'), addTrandingProduct)
productrouter.put("/updateTrandingProduct/:trandingProduct_name", image_upload.single('trandingProduct_image'), updateTrandingProduct)
productrouter.get("/allTrandingProduct/:trandingProduct_name", allTrandingAllProduct)
productrouter.get("/allTrandingProduct", allTrandingAllProduct)
productrouter.get("/singleTrandingProduct/:trandingProduct_name", singleTrandingProduct)
productrouter.delete("/deleteTrandingProduct/:trandingProduct_id", deleteTrandingProduct)



// product 

productrouter.post('/addproduct',addProduct)
productrouter.delete("/deleteProduct/:product_id", deleteProduct)
productrouter.get("/singleProduct/:product_id", singleProduct)
productrouter.put("/updateProduct/:product_id", updateProduct)
productrouter.get("/allProduct", allProduct)
productrouter.post('/uploadFeaturedImage/:product_id', featureImageUpload, setFeatureImage)
productrouter.post('/uploadProductImages/:product_id', productImagesUpload, setProductImages)
//varaition
productrouter.post('/addVariation', addVariation)
productrouter.put("/updateVariation/:variation_id",updateVaraition)
productrouter.get("/getVariation/:slug",getVariation )
// category

productrouter.post("/addCategory", image_upload.single('category_image'), addCategory)
productrouter.put("/updateCategory/:category_id", image_upload.single('category_image'), updateCategory)
productrouter.get("/allCategory", allCategory)
productrouter.get("/singleCategory/:category_id", singleCategory)
productrouter.delete("/deleteCategory/:category_id", deleteCategory)

// slider

productrouter.post("/slider", image_upload.single('slider_image'), addSlider)
productrouter.get("/allSlider", sliderShow)
productrouter.delete("/deleteSlider/:Slider_id", sliderDelete)
productrouter.put("/updateSlider/:Slider_id", image_upload.single('slider_image'), slider_update)

// flavour

productrouter.post('/addFlavour', addFlavour)
productrouter.delete("/deleteFlavour/:flavour_id", deleteFlavour)
productrouter.put("/updateFlavour/:flavour_id", updateFlavour)
productrouter.get("/allFlavour", allFlavour)

// weight

productrouter.post('/addWeight', addWeight)
productrouter.delete("/deleteWeight/:weigth_id", deleteWeight)
productrouter.put("/updateWeigh/:weigth_id", updateWeight)
productrouter.get("/allWeigh", allWeight)

// setting

productrouter.post('/addSetting', addSetting)
productrouter.put("/updateSetting/:setting_id", updateSetting)
productrouter.get("/allSetting", settingShow)

// contact inquiry

productrouter.post('/addContactInquiry', addContactInquiry)
productrouter.delete("/deleteContactInquiry/:contactInquiry_id", deleteContactInquiry)
productrouter.get("/allContactInquiry", allContactInquiry)

// employee 

productrouter.post('/addemployee', addEmployee)
productrouter.put("/updateemployee/:employee_id", updateEmployee)
productrouter.get("/allemployee", allEmployee)

// register user

productrouter.post('/addregistereduser', addRegisteredUser)
productrouter.get("/allregistereduser", allRegisteredUser)


// coupon

productrouter.post('/addcoupon', addCoupon)
productrouter.get('/allcoupon', allCoupon)
productrouter.delete('/deletecoupon', deletedCoupon)
productrouter.put('/updatecoupon', )


productrouter.get("/getProductReviews/:productId",getProductReviews)

// shop by price goal 

productrouter.get("/selectedShopByGoalPrice/:minimumAmount", selectedShopByGoalPrice)

// user login width otp

productrouter.post('/userSendOtp', userSendOtp)
productrouter.post('/userVerifyOtp', userVeryfieOtp)
productrouter.post('/userResendOtp', userResendOtp)


// google and fasebook

productrouter.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

productrouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.cookie("token", req.user.token);
    res.redirect("http://localhost:3000");
  }
);

productrouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

productrouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.cookie("token", req.user.token);
    res.redirect("http://localhost:3000");
  }
);



// combo products 

productrouter.post('/addComboProducts', image_upload.single('combo_product_image'), addComboProduct)
productrouter.delete("/deleteComboProducts/:product_id", deleteComboProduct)
productrouter.get("/singleComboProduct/:product_id", singleComboProduct)
productrouter.put("/updateComboProducts/:product_id", image_upload.single('combo_product_image'), updateComboProduct)
productrouter.get("/allComboProducts", allComboProduct)





// flash sale 

productrouter.get('/allFlashSale', allDiscountUnderTime);
productrouter.post('/addFlashSale', addDiscountUnderTime);
productrouter.put("/updateFlashSale/:flashSale_id", updateDiscountUnderTime)
productrouter.delete("/deleteFlashSale/:flashSale_id", deleteDiscountUnderTime)
productrouter.get("/singleFlashSale/:flashSale_id", singleDiscountUnderTime)


// searching 

productrouter.get("/searchProduct",productSearch)





// token valid

productrouter.use(authmidleware)

// review 


productrouter.post("/addReview",addReview)
productrouter.get("/allReview",allReview)
productrouter.get("/getUserReview/:productId",getUserReview)

productrouter.get("/deleteReview/:review_id",deleteReview)


// payment

productrouter.post("/capture/:paymentId", verify)
productrouter.get("/getAllproducts", getOrderDetails)



// wishlist 

productrouter.post("/addToWishlist", addToWishlist)
productrouter.delete("/removeFromWishlist",removeFromWishlist)
productrouter.get("/getWishlist", getWishlist)

//addresses
productrouter.get("/getAddresses",getAddresses);
productrouter.get("/getAddressById/:addressId",getAddresseById);
productrouter.post("/add-address",addAddress);
productrouter.put("/update-address",updateAddress);
productrouter.delete("/delete-address",deleteAddress);
productrouter.put("/set-default-address",setDefaultAddress);
productrouter.get("/get-default-address",getDefaultAddress)


productrouter.get('/cart/getCart', getCart);
//API for adding item to cart
productrouter.post('/cart/addToCart', addToCart);

//API for removing Items from cart
productrouter.post('/cart/removeFromCart', removeFromCart);

//API for Increment qty in cart
productrouter.post('/cart/incrementInCart', incrementInCart);

//API for Decrement qty in cart
productrouter.post('/cart/decrementInCart', decrementInCart);

//API for Storing Items from cart
productrouter.post('/cart/setCart', setCart);

module.exports = productrouter;
