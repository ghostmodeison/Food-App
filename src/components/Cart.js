import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../util/constants";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { decrement, addItem, removeItem } from "./Redux/slice/CartSlice";
import toast from "react-hot-toast";
import axios from "axios";
import razorpayImage from "../image/logo2.png";

function Cart() {
  const dispatch = useDispatch();

  const isLogined = useSelector((state) => state.login?.isLogined);

  const navigate = useNavigate();

  //checkout Button Handler
  async function checkoutButtonHandler() {
    if (isLogined) {
      await axios
        .post("/api/v1/payment/checkout", {
          amount: totalPrice,
        })
        .then(async (response) => {
          console.log("This is inside response ", response);

          const keyData = await axios.get("/api/v1/getKey");
          const key = keyData?.data?.key;

          const options = {
            key,
            amount: response?.data?.order?.amount,
            currency: "INR",
            name: "Manish Restaurant",
            description: "Manish Restaurant's Test Transaction",
            // image: { razorpayImage },
            order_id: response?.data?.order?.id,
            callback_url: "/api/v1/payment/paymentVerification",
            prefill: {
              name: "Gaurav Kumar",
              email: "gaurav.kumar@example.com",
              contact: "9000090000",
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };

          var razor = new window.Razorpay(options);
          razor.open();
        })

        .catch((error) => console.log("This is inside error ", error));
    } else {
      toast.error("Please login first");
      navigate("/login");
    }
  }

  //increase count when clicked on +
  const increaseHandler = (items) => {
    dispatch(addItem(items));
  };

  //Decrease count when clicked on -
  const decreaseHandler = (items) => {
    dispatch(decrement(items));
  };

  //remove item from cart (redux)
  function removeHandler(items) {
    //items?.card?.info?.id will be added as action.payload in redux
    toast.success("Item removed successfully");
    dispatch(removeItem(items));
  }
  //import data from redux
  const cartItemList = useSelector((state) => state?.cart?.items);
  console.log(cartItemList);

  //total price
  const [totalPrice, setTotalPrice] = useState(0);
  const total = () => {
    let tPrice = 0;
    cartItemList.map((items) => {
      tPrice += (items.card?.info?.price / 100) * items.card?.info?.inStock;
    });
    setTotalPrice(tPrice);
  };
  useEffect(() => {
    total();
  }, [cartItemList]);

  return cartItemList.length === 0 ? (
    <div className=" text-center flex justify-center my-30 space-y-10 flex-col w-auto h-screen">
      <div>
        <MdRemoveShoppingCart className=" text-9xl m-auto text-slate-600" />
      </div>

      <div className="text-5xl font-semibold text-slate-500">
        Your Cart is Empty.
      </div>
      <div className=" text-slate-500">
        Look like you have not added anything to your cart.
      </div>
      <button className="bg-blue-500 w-20 rounded-lg hover:bg-blue-700 text-white font-bold py-2 px-4 m-auto">
        <Link to="/"> Add</Link>
      </button>
    </div>
  ) : (
    <div className="  my-40 space-y-10 flex-col justify-center items-center align-middle w-auto m-auto mx-72 h-screen">
      <div className=" text-cyan-700 font-bold text-4xl">Cart</div>

      <div className="flex justify-between h-full ">
        <div className=" w-3/5 relative">
          <div className=" text-xs text-slate-400 relative flex w-11/12 m-auto justify-between">
            <h1 className="w-2/6">PRODUCT</h1>
            <h1 className=" relative right-7">PRICE</h1>
            <h1 className=" relative right-9">QUANTITY</h1>
            <h1 className=" relative right-14">TOTAL</h1>
          </div>

          {cartItemList.map((items) => (
            <div className=" shadow-md rounded-lg px-4 py-2 space-y-5 m-6  text-slate-600">
              <div className="flex justify-between m-auto ">
                <div className="flex-col w-2/5 space-y-6">
                  <img
                    className="rounded-md shadow-md h-32 w-40 "
                    src={CDN_URL + items?.card?.info?.imageId}
                    alt="Pic"
                  />
                  <div className="m-auto  ">
                    <h1 className="font-semibold text-left  text-slate-600 ">
                      {items?.card?.info?.name}
                    </h1>
                  </div>
                </div>

                <h1 className=" m-auto text-lg">
                  ₹
                  {items?.card?.info?.price
                    ? items?.card?.info?.price / 100
                    : items?.card?.info?.defaultPrice / 100}
                </h1>

                <div className=" m-auto flex space-x-4 bg-blue-400 rounded-lg hover:bg-blue-700 text-white font-bold py-2 px-4">
                  <div
                    className=" cursor-pointer"
                    onClick={() => decreaseHandler(items)}
                  >
                    -
                  </div>
                  <div className=" border-r-2"></div>
                  <div>{items?.card?.info?.inStock} </div>
                  <div className=" border-l-2"></div>
                  <div
                    className=" cursor-pointer"
                    onClick={() => {
                      increaseHandler(items);
                    }}
                  >
                    +
                  </div>
                </div>

                <h1 className="m-auto text-lg">
                  ₹
                  {(items?.card?.info?.price / 100) *
                    items?.card?.info?.inStock}
                </h1>
                <MdDelete
                  onClick={() => removeHandler(items)}
                  className=" cursor-pointer text-xl text-slate-600"
                />
              </div>
            </div>
          ))}
        </div>
        <div className=" px-20 py-10 h-64 shadow-lg space-y-5 fixed rounded-lg right-80 text-cyan-700 ">
          <h1 className="font-bold text-4xl">Summary</h1>
          <div>
            <h1>
              Total items:
              <span className=" font-semibold"> {cartItemList.length}</span>
            </h1>
            <h1>
              Total Price :
              <span className=" font-semibold"> ₹{totalPrice}</span>
            </h1>
          </div>
          <button
            onClick={checkoutButtonHandler}
            className=" w-full m-auto flex space-x-4 bg-blue-400 rounded-lg hover:bg-blue-700 text-white font-bold py-2 px-4"
          >
            <span className=" m-auto">Checkout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Cart;
