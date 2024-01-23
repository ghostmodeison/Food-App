import React from "react";
import pizza from "../image/pizza.png";
import Login from "./Login";
import Signup from "./Signup";
import Section from "../Animation.js/Section";
import { useSelector } from "react-redux";

export default function LoginPage() {
  const signupClicked = useSelector((state) => state.login.signupClicked);
  return (
    <Section>
      <div className=" my-56 h-screen ">
        <div className="flex justify-center space-x-10 ">
          <div className=" w-1/4 ">
            <img src={pizza} alt="" />
          </div>
          {signupClicked ? <Signup /> : <Login />}
        </div>
      </div>
    </Section>
  );
}
