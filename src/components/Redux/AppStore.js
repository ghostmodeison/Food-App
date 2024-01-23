import { configureStore } from "@reduxjs/toolkit";
import CartSliceReducer from "./slice/CartSlice";
import LoginSliceReducer from "./slice/LoginSlice";

const AppStore = configureStore({
  reducer: {
    cart: CartSliceReducer,
    login: LoginSliceReducer,
  },
});

export default AppStore;
