import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItem.find((item) => item.id === action.payload.id);
      if (item) {
        item.qty += action.payload.qty;
      } else {
        state.cartItem.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItem = state.cartItem.filter(
        (item) => item.id !== action.payload.id
      );
    },
    increaseCount: (state, action) => {
      state.cartItem = state.cartItem.map((item) => {
        if (item.id === action.payload.id) {
          item.qty++;
        }
        return item;
      });
    },
    decreaseCount: (state, action) => {
      state.cartItem = state.cartItem.map((item) => {
        if (item.id === action.payload.id) {
          item.qty--;
        }
        return item;
      });
    },
    clearCart: (state) => {
      state.cartItem = initialState;
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
