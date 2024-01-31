import { instance } from "../config/razorpay.config.js";
import { ApiError } from "../utils/ApiError.js";
import crypto from "crypto";

//============ capture the payment ==================
const checkout = async (req, res) => {
  const { amount } = req.body;
  const currency = "INR";

  const option = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
  };
  try {
    //initiate the payment using razorpay
    const order = await instance.orders.create(option);
    console.log(order);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.log("This is error: ", err);
    return res.status(500).json({
      success: false,
      message: "Couldn't initiate the payment",
    });
  }
};

//============= payment verification ==============
const paymentVerification = async (req, res) => {
  console.log("paymentVerification: ", req.body);

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    res.redirect(`/summary?reference=${razorpay_payment_id}`);
  } else {
    res.status(200).json({
      success: false,
    });
  }
};

export { checkout, paymentVerification };
