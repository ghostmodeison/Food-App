import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      //if item already exixt then increase the quantity
      const itemIndex = state.items.findIndex(
        (items) => items.card.info.id === action.payload.card?.info?.id
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].card.info.inStock += 1;
      } else {
        //if item dont exist then simply push it on items [],
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (items) => items.card.info.id !== action.payload?.card?.info?.id //action.payload is result from function indide dispatch
      );
    },
    clearCart: (state, action) => {
      state.items.length = 0;
      // or you can write => return {item : []}
    },
    decrement: (state, action) => {
      const itemIndex = state.items.findIndex(
        (items) => items.card.info.id === action.payload.card?.info?.id
      );
      state.items[itemIndex].card.info.inStock -= 1;
      if (state.items[itemIndex].card.info.inStock <= 0) {
        state.items = state.items.filter(
          (items) => items.card.info.id !== action.payload?.card?.info?.id
        );
      }
    },
  },
});
export const { decrement, addItem, removeItem, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
