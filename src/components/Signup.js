import axios from "axios";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupClickeHandler } from "./Redux/slice/LoginSlice";

export default function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  //submit button
  async function submitHandler(event) {
    try {
      event.preventDefault();
      await axios
        .post("/api/v1/user/register", data)
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            dispatch(signupClickeHandler(false));
            navigate("/login");
          }
        })
        .catch((rej) => {
          toast.error(rej.response.data.message);
        });
    } catch (error) {
      console.log("this is error:", error);
    }
  }
  //change handler
  function changeHandler(event) {
    setData((preData) => ({
      ...preData,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <form onSubmit={submitHandler}>
      <div className=" flex-col flex justify-center align-middle text-center shadow-md p-20 space-y-5 ">
        <h1 className=" font-semibold text-3xl text-slate-500 ">SignUp Here</h1>

        <div className="flex justify-center space-x-3">
          <input
            className=" border rounded-md p-1"
            type="text"
            name="username"
            value={data.username}
            onChange={changeHandler}
            placeholder="User Name"
          />
        </div>
        <div className="flex justify-center space-x-3 my-5 ">
          <input
            className=" border rounded-md p-1"
            type="text"
            name="email"
            value={data.email}
            onChange={changeHandler}
            placeholder="Email"
          />
        </div>
        <div className="flex justify-center space-x-3">
          <input
            className=" border rounded-md p-1"
            type="password"
            name="password"
            value={data.password}
            onChange={changeHandler}
            placeholder="Password"
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 rounded-lg hover:bg-blue-700 text-white font-bold py-2 px-4"
          >
            SignUp
          </button>
        </div>
      </div>
    </form>
  );
}
