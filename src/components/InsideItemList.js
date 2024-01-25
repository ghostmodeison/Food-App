import React from "react";
import { CDN_URL } from "../util/constants";
import { useDispatch } from "react-redux";
import { addItem } from "./Redux/slice/CartSlice";
import toast from "react-hot-toast";

export default function InsideItemList({ data }) {
  //add items on cart(redux)
  const dispatch = useDispatch();
  const addOnCartHandler = (items) => {
    toast.success("Items added successfully");
    dispatch(addItem(items));
  };
  return (
    <div>
      {data.map((items) => (
        <div>
          <div className=" flex justify-between align-middle">
            <div className=" w-2/3 my-11 space-y-1 p-4 ">
              <h1 className=" font-semibold"> {items?.card?.info?.name} </h1>
              <h1 className=" text-sm">
                ₹
                {items?.card?.info?.price
                  ? items?.card?.info?.price / 100
                  : items?.card?.info?.defaultPrice / 100}
              </h1>
              <h1 className=" text-xs text-slate-500">
                {items?.card?.info?.description}
              </h1>
            </div>

            <div className=" flex justify-center align-middle items-center flex-col m-auto  w-1/3">
              <img
                className=" rounded-md shadow-md h-32 w-40 "
                src={CDN_URL + items?.card?.info?.imageId}
                alt="Pic"
              />
              <button
                onClick={() => addOnCartHandler(items)}
                className=" relative -top-5 bg-blue-400 rounded-lg hover:bg-blue-700 text-white font-bold py-2 px-4"
              >
                add+
              </button>
            </div>
          </div>

          <div className=" border-b-2 "></div>
        </div>
      ))}
    </div>
  );
}
