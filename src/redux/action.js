import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const ThemeChanger = (value) => async (dispatch) => {
    dispatch({
        type: "ThemeChanger",
        payload: value
    });
};

const productSlice = createSlice({
    name: 'products',
    initialState: {
        data: []
    },
    reducers: {}
})

const cartSlice = createSlice({
    name: 'products',
    initialState: {
        items: []
    },
    reducers: {
        addCart: (state, action) => {
            const itemCart = state.items.find((item) => item.id === action.payload.id);
            if (itemCart) {
                itemCart.quantity += 1
            } else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
        },
        removeCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
        },
        updateCart: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity
            }
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
})

const wishListSlice = createSlice({
    name: 'wishList',
    initialState: {
        items: []
    },
    reducers: {
        addToWishList: (state, action) => {
            const productExist = state.items.filter((product) => product.id === action.payload.id).length > 0;
            if (!productExist) {
                state.items.push(action.payload);
            }
            else {
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: " Oops...",
                    text: ' Item is already in WishList',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },
        removeWishList: (state, action) => {
            state.items = state.items.filter((product) => product.id !== action.payload)
        }
    }
})

const buyNowSlice = createSlice({
    name: 'buyNow',
    initialState: {
        buyNow: []
    },
    reducers: {
        addToBuy: (state, action) => {
            const existingItem = state.buyNow.find((item) => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += 1;

            } else {
                state.buyNow.push({ ...action.payload, quantiy: 1 })
            }
        },
        removeBuy: (state, action) => {
            state.buyNow = state.buyNow.filter((item) => item.id !== action.payload)
        },
        clearBuy: (state) => {
            state.buyNow = []
        }
    }
});

const buyCartSlice = createSlice({
    name: 'buyCart',
    initialState: {
        buyCart: []
    },
    reducers: {
        addToBuyCart: (state, action) => {
            const existingItem = state.buyCart.find((item) => item.id === action.payload.id);
            const cartItems = action.payload

            if (existingItem) {
                existingItem.quantity += cartItems.quantity
            } else {
                state.buyCart.push({ ...cartItems, quantity: cartItems.quantity })
            }
        },
        removeBuyCart: (state, action) => {
            state.buyCart = state.buyCart.filter((item) => item.id !== action.payload)
        },
        clearBuyCart: (state) => {
            state.buyCart = []
        }
    }
})

export const { addCart, removeCart, updateCart, clearCart } = cartSlice.actions
export const { addToWishList, removeWishList } = wishListSlice.actions
export const { addToBuy, removeBuy, clearBuy } = buyNowSlice.actions
export const { addToBuyCart, removeBuyCart, clearBuyCart } = buyCartSlice.actions

export const productReducer = productSlice.reducer
export const cartReducer = cartSlice.reducer
export const wishListReducer = wishListReducer
export const buyNowReducer = buyNowSlice.reducer
export const buyCartReducer = buyCartSlice.reducer