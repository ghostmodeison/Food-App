import { Link, useNavigate } from "react-router-dom";
import logo from "../image/logo2.png";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { signupClickeHandler, loginHandler } from "./Redux/slice/LoginSlice";
import axios from "axios";
import toast from "react-hot-toast";
import Hamburger from "hamburger-react";
import { useState } from "react";

const NavBar = () => {
  //data from redux for cart's number count
  const cartItem = useSelector((state) => state.cart.items);
  const isLogined = useSelector((state) => state.login.isLogined);

  const userName = useSelector((state) => state.login.userName);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function loginButtonHandler() {
    navigate("/login");
    dispatch(signupClickeHandler(false));
  }
  function signupButtonHandler() {
    navigate("/login");
    dispatch(signupClickeHandler(true));
  }

  async function logoutButtonHandler(event) {
    try {
      event.preventDefault();
      await axios
        .post("/api/v1/user/logout")
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            navigate("/");
            dispatch(loginHandler(false));
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
  //for hamburger icon
  const [isOpen, setOpen] = useState(true);

  const hamburgerClickHandler = () => {
    setOpen(!isOpen);
  };

  return (
    <div className=" bg-white top-0 w-full fixed z-20 shadow-lg  font-bold h-20">
      <nav className=" flex mx-5 justify-between items-center align-middle ">
        <div>
          <Link to="/home">
            <img className=" w-20 logo" src={logo} alt="Monato" />
          </Link>
        </div>

        {
          <div
            className={
              !isOpen
                ? "hidden"
                : "block" +
                  " h-screen lg:flex lg:space-x-40 lg:m-auto lg:static lg:h-auto  lg:shadow-none lg:bg-transparent absolute right-0 rounded-lg top-0 z-50 bg-slate-50 justify-center align-middle items-center shadow-lg"
            }
          >
            <ul className=" align-middle items-center justify-center space-y-5 m-16 lg:m-auto lg:space-y-0 lg:flex gap-20 ">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link className=" text-blue-400 " to="/grocery">
                  <span> 🛒 Grocery</span>
                </Link>
              </li>
            </ul>
            {!isLogined ? (
              <div className=" flex flex-col gap-3 m-8 lg:m-auto lg:flex-none lg:flex-row  ">
                <button
                  onClick={loginButtonHandler}
                  className="bg-blue-500 rounded-lg hover:bg-blue-700 text-white font-bold py-2 px-4"
                >
                  Login
                </button>

                <button
                  onClick={signupButtonHandler}
                  className="bg-blue-500 rounded-lg hover:bg-blue-700 text-white font-bold py-2 px-4"
                >
                  SignUp
                </button>
              </div>
            ) : (
              <button
                onClick={logoutButtonHandler}
                className="bg-blue-500 rounded-lg hover:bg-blue-700 text-white font-bold py-2 px-4"
              >
                Logout
              </button>
            )}
          </div>
        }

        <div className=" flex space-x-7 justify-center  align-middle items-center ">
          <div>
            {isLogined ? (
              <h1>
                Welcome, {userName[0].toUpperCase()}
                {userName.slice(1, userName.length)}{" "}
              </h1>
            ) : (
              <h1></h1>
            )}
          </div>
          <div className=" flex space-x-8 ">
            <div>
              <Link
                className="m-auto flex justify-center align-middle "
                to="/cart"
              >
                <div className="m-auto ">
                  <HiMiniShoppingCart className=" text-2xl" />
                </div>
                <div className=" h-6 px-1 text-white relative right-3 -top-3 bg-orange-500 rounded-full">
                  <h1 className=" px-1 "> {cartItem.length} </h1>
                </div>
              </Link>
            </div>
          </div>

          <div className=" lg:hidden z-50">
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </div>
        </div>
      </nav>
    </div>
  );
};
//======

export default NavBar;
