const { JWT_SECRET_KEY } = require("../../constent/Constent");
const jwt = require("jsonwebtoken")
require('dotenv').config()
const OTP_TEMPLATE_ID = process.env.OTP_TEMPLATE_ID
const OTP_AUTH_ID = process.env.OTP_AUTH_ID
const fetch = require('node-fetch');
const AddToCartModel = require("../../model/cart/addtocart_model");
const UserLoginModel = require("../../model/userLoginPart/user_modal");
const WishlistModel = require("../../model/wishlist/wishlist_model");




exports.userSendOtp = async (req, res) => {
    const url = `https://control.msg91.com/api/v5/otp?template_id=${OTP_TEMPLATE_ID}&mobile=${req.body.mobile}`;
    try {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authkey: OTP_AUTH_ID
            },
            body: JSON.stringify({ Param1: 'value1', Param2: 'value2', Param3: 'value3' })
        }
        fetch(url, options)
            .then(res => res.json())
            .then(json => res.json({
                ...json
            }))
    }
    catch (error) {
        console.log(error);
    }
}



exports.userVeryfieOtp = async (req, res) => {

    try {
        const url = `https://control.msg91.com/api/v5/otp/verify?otp=${req.body.otp}&mobile=${req.body.mobile}`
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', authkey: OTP_AUTH_ID }
        };

        const response = await fetch(url, options);
      
        const data = await response.json();
        
        if (data.type == "success") {
            const user = await UserLoginModel.findOne({ mobile:req.body.mobile })
            if (!user) {
                
                const cart = await AddToCartModel.create({ items: [], user: null });
                const wishlist = await new WishlistModel({ items: [], user: null }).save();
               
                const newUser = await UserLoginModel.create({ mobile: req.body.mobile, cart,wishlist });
               

                cart.user = newUser;
                cart.save();
                wishlist.user=newUser;
                wishlist.save();
                jwt.sign(
                    {
                      userId: newUser._id,
                    },
                    JWT_SECRET_KEY,
                    (err, token) => {
                        res.json({
                   
                            status:"success",
                            message:"Successfully signed up",
                            token:token,
                        })
                    }
                  );
               
            
            }
            if (user) {
                jwt.sign(
                    {
                      userId: user._id,
                    },
                    JWT_SECRET_KEY,
                    (err, token) => {
                        res.json({
                   
                            sttus:"success",
                            message:"Successfully logged in",
                            token:token,
                        })
                    }
                  );
            }
        }
        else {
            res.json({ success: false, message: "Something Went Wrong" })
        }



    }
    catch (err) {
        console.log("err" + err); res.json({ err })
    };
}


exports.userResendOtp = async (req, res) => {
    try {
        const url = `https://control.msg91.com/api/v5/otp/retry?retrytype=text&mobile=${req.body.mobile}`;
        const options = {
            method: 'POST',
            headers: { accept: 'application/json', authkey: OTP_AUTH_ID }
        };
        fetch(url, options)
            .then(res => res.json())
            .then(json => res.json({
                ...json
            }))
    } catch (error) {
        console.log(error);
    }
}