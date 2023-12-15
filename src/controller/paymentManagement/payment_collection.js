require('dotenv').config()
const Razorpay = require('razorpay');
const crypto = require("crypto");
const OrderModel = require('../../model/order/order_model');
const Constent = require('../../constent/Constent');
const { default: mongoose } = require('mongoose');

const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY
});

exports.createOrder = async (req, res) => {



    try {
        const data = req.body;

        const amount = parseFloat(data.amount) * 100

        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'razorUser@gmail.com',
            payment_capture: 0,

        }

        razorpayInstance.orders.create(options,
            async (err, order) => {
                if (!err) {
                    res.status(200).send({
                        success: true,
                        message: 'Order Created success',
                        order: order

                    });
                }
                else {
                    res.status(400).send({ success: false, msg: 'Something went wrong!' });
                }
            }
        );

    } catch (error) {
        console.log(error.message);
    }
}

exports.verify = async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log(userId);


        // date amd time

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; 
        const currentDay = currentDate.getDate();
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        const currentSecond = currentDate.getSeconds();

        console.log(`Current Date: ${currentYear}-${currentMonth}-${currentDay}`);
        console.log(`Current Time: ${currentHour}:${currentMinute}:${currentSecond}`);

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature } = req.body.response;

        var generatedSignature = crypto
            .createHmac(
                "SHA256",
                RAZORPAY_SECRET_KEY
            )
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        const paymentDataSet = {
            razorpay_order_id: razorpay_order_id,
            razorpay_payment_id: razorpay_payment_id,
            user: userId,
            items: req.body.items,
            shippingAddress: req.body.shippingAddress,
            currentDate: `${currentYear}-${currentMonth}-${currentDay}`,
            currentTime: `${currentHour}:${currentMinute}:${currentSecond}`
        }

        if (generatedSignature == razorpay_signature) {

            const paymentSetMongo = await OrderModel.create(paymentDataSet)
            console.log(paymentSetMongo);

            if (paymentSetMongo) {
                res.json({
                    status: "success",
                    message: "payment successfully"
                })
            }


        }
        else {
            res.json({
                message: "invbalid  signature sent"
            })
        }
    }
    catch (error) {
        console.log(error)
        res.json({
            status: "error",
            message: "internel server error"
        })
    }
}




exports.getOrderDetails = async (req, res) => {
    const userId = req.user.userId;
    const useridd = new mongoose.Types.ObjectId(userId);

    try {
        // let orders = await OrderModel.find({ user: userId }).populate({path:"items.product_id",model:ProductModel})
        let orders = await OrderModel.aggregate([
            { $match: { user: useridd } },
            {
                $lookup: {
                    from: "all_products",
                    localField: "items.product_id",
                    foreignField: "_id",
                    as: "order"
                }
            },
            { $unwind: "$order" },
        ])

        orders.map(ele =>
            ele.order.product_image = `${Constent.IMAGE_HOST}${ele.order.product_image}`
        )

        if (orders) {

            res.json({
                status: "success",
                message: "order successfully",
                orders: orders
            })



        }
        else {
            res.json({
                message: "invbalid  signature sent"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}