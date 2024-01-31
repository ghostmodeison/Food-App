import NavBar from "./components/NavBar";
import MyBody from "./components/MyBody";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import { createBrowserRouter } from "react-router-dom";
import Error from "./components/Error";
import { Outlet } from "react-router-dom";
import RestaurantMenu from "./components/RestaruantMenu";
import { lazy, Suspense } from "react";
import Cart from "./components/Cart";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Summary from "./components/Summary";

const Grocery = lazy(() => import("./components/Grocery"));

function App() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/",
        element: <MyBody />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/summary",
        element: <Summary />,
      },
      {
        path: "*",
        element: <MyBody />,
      },
      {
        path: "restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading for Grocery.</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
    ],
  },
]);

export default AppRouter;
