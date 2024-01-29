import Router from "express";
import {
  checkout,
  verifySignature,
} from "../controllers/payment.controller.js";

const paymentRouter = Router();
paymentRouter.route("/checkout").post(checkout);
paymentRouter.route("/verifySignature").post(verifySignature);

export default paymentRouter;
