import { Link, useNavigate } from "react-router-dom";
import logo from "../image/logo2.png";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { signupClickeHandler, loginHandler } from "./Redux/slice/LoginSlice";
import axios from "axios";
import toast from "react-hot-toast";

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

  return (
    <div className=" bg-white top-0 fixed z-20 w-full shadow-lg flex gap-24 font-bold h-20 mx-auto justify-center items-center ">
      <div>
        <Link to="/home">
          <img className=" w-20 logo" src={logo} alt="Monato" />
        </Link>
      </div>

      <div>
        <ul className="hidden lg:flex gap-x-10 ">
          <li>
            <Link to="/home"> Home </Link>
          </li>
          <li>
            <Link to="/about"> About </Link>
          </li>
          <li>
            <Link to="/contact"> Contact </Link>
          </li>
          <li>
            <Link className=" text-blue-400 " to="/grocery">
              🛒 Grocery
            </Link>
          </li>
        </ul>
      </div>

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
      <div className=" flex space-x-8  ">
        <Link className="m-auto " to="/cart">
          <div className="m-auto ">
            <HiMiniShoppingCart className=" text-2xl" />
          </div>
        </Link>
        <div className=" h-6 px-1 text-white relative -left-10 bg-orange-500 rounded-full">
          <h1 className=" px-1 "> {cartItem.length} </h1>
        </div>
        {!isLogined ? (
          <div className=" hidden lg:flex space-x-2 ">
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
    </div>
  );
};
//======

export default NavBar;
