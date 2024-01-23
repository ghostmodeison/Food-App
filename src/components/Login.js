import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginHandler, nameHandler } from "./Redux/slice/LoginSlice";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  function changeHandler(event) {
    setFormData((preData) => ({
      ...preData,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitHandler(event) {
    try {
      event.preventDefault();
      await axios
        .post("/api/v1/user/login", formData)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.data.user.username);
            dispatch(nameHandler(res.data.data.user.username));

            toast.success(res.data.message);

            navigate(-1);
            dispatch(loginHandler(true));
          } else {
            toast.error("login error");
            console.log("Wrong info info");
          }
        })
        .catch((rej) => {
          toast.error(rej.message);
          console.log("error is : ", rej);
          console.log("wrong info");
        });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <div className=" flex-col flex justify-center align-middle text-center shadow-md p-20 space-y-5 ">
        <h1 className=" font-semibold text-3xl text-slate-500 ">Login Here</h1>
        <div className="flex justify-center space-x-3 my-5 ">
          <input
            className="rounded-md border mx-1 p-1"
            type="text"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Email"
          />
        </div>
        <div className="flex justify-center space-x-3">
          <input
            className="rounded-md border mx-1 p-1"
            type="text"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Password"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 rounded-lg hover:bg-blue-700 text-white font-bold py-2 px-4"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
}
