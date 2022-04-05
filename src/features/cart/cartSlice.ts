import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../components/productTile";

interface Cart {
  product: Product[];
  total: number;
}

const initialState: Cart = { product: [], total: 0 };

const getItemIndex = (state: Product[], idToFind: number): number => {
  const ids = state.map((item) => item.productID);
  return ids.indexOf(idToFind);
};

const calculateTotal = (state: Cart): void => {
  const total = state.product
    .reduce((acc, item) => acc + item.offerPrice * item.quantity, 0)
    .toFixed(2);

  state.total = parseInt(total);
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const itemIndex = getItemIndex(state.product, action.payload.productID);
      if (itemIndex && itemIndex < 0) state.product.push(action.payload);
      else {
        state.product[itemIndex].quantity =
          state.product[itemIndex].quantity + action.payload.quantity;
      }
      calculateTotal(state);
    },
    itemCount: (state, action) => {
      state.product.length;
    },
    incrementQuantity: (state, action) => {
      const itemIndex = getItemIndex(state.product, action.payload.productID);
      state.product[itemIndex].quantity += 1;
      calculateTotal(state);
    },
    decrementQuantity: (state, action) => {
      const itemIndex = getItemIndex(state.product, action.payload.productID);
      state.product[itemIndex].quantity -= 1;
      calculateTotal(state);
    },
    removeItem: (state: Cart, action: PayloadAction<Product>) => {
      state.product = state.product.filter(
        (item) => item.productID !== action.payload.productID
      );
      calculateTotal(state);
    },
  },
});

export const {
  addItem,
  itemCount,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} = cartSlice.actions;
export default cartSlice.reducer;
