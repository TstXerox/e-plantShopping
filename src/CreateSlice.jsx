import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

export const CreatSlice = createSlice({
	name: "cart",
	initialState: {
		items: [], // Initialize items as an empty array
      totalQuantity: 0
	},
	reducers: {
		addItem: (state, action) => {
         const { name, image, cost } = action.payload;
         const existingItem = state.items.find(item => item.name === name);

         if (existingItem) {
            existingItem.quantity++;
         } else {
            state.items.push({ name, image, cost, quantity: 1});
         }
         state.totalQuantity++;
      },
		removeItem: (state, action) => {
         const itemToRemove = state.items.find(item => item.name === action.payload.name);
         state.totalQuantity -= itemToRemove.quantity;
         state.items = state.items.filter(item => item.name !== action.payload.name);
      },
		updateQuantity: (state, action) => {
         const { name, quantity } = action.payload;
         const itemToUpdate = state.items.find(item => item.name === name);
         const differenceToUpdate = quantity - itemToUpdate.quantity; 

         if (itemToUpdate) {
            itemToUpdate.quantity = quantity;
         }
         
         state.totalQuantity += differenceToUpdate;
      },
	},
});

export const { addItem, removeItem, updateQuantity } = CreatSlice.actions;

export default CreatSlice.reducer;
