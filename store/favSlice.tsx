import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface FavoritesState {
  items: CartItem[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFav: (state, action: PayloadAction<CartItem>) => {
      // Check if the item is already in the favorites
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        state.items.push(action.payload);
      }
    },
    removeFromFav: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { addToFav, removeFromFav, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
