import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [
    {
      name: {
        type: "string",
        required: true,
      },
      qty: {
        type: "Number",
        required: true,
      },
      price: {
        type: "Number",
        required: true,
      },
    },
  ],
});
