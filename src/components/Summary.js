import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Summary() {
  const navigate = useNavigate();
  const homeButtonHandler = () => {
    navigate("/home");
  };
  const searchQuary = useSearchParams()[0];
  const paymentOrderNumber = searchQuary.get("reference");
  return (
    <div className=" text-lg gap-2 border w-screen h-screen flex flex-col justify-center align-middle items-center text-slate-500">
      <FaCheckCircle className=" text-8xl" />

      <h1 className=" text-5xl">Thank You</h1>

      <h1> Your order has received</h1>

      <h1 className=" m-6">
        {" "}
        Your payment id is:{" "}
        <span className=" font-semibold">{paymentOrderNumber}</span>
      </h1>
      <button
        onClick={homeButtonHandler}
        className="bg-blue-500 rounded-lg hover:bg-blue-700 text-white font-bold py-2 px-4"
      >
        Home
      </button>
    </div>
  );
}
