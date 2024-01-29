import { json } from "react-router-dom";
import { instance } from "../config/razorpay.config.js";
import { ApiError } from "../utils/ApiError.js";

//capture the payment
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

//verify Signature

const verifySignature = async (req, res) => {
  const webhookSecret = "1234"; // in server (backend)

  const signature = req.headers("x-razorpay-signature");

  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (signature == digest) {
    console.log("payment is authorized");
  }
};

export { checkout, verifySignature };
