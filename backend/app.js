import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORES_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes
import userRouter from "./routes/user.router.js";
import paymentRouter from "./routes/payment.router.js";

//router declarations
app.use("/api/v1/user", userRouter);
app.use("/api/v1/payment", paymentRouter);

app.use(globalErrorHandler);

export { app };
