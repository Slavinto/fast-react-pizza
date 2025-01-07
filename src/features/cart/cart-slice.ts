import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    ActionCartItemsQuantityUpdated,
    ActionCartItemsRemoved,
    CartActionTypes,
    CartState,
} from "../../types/types";
import { RootState } from "../../store/store";
import { createSelector } from "reselect";
const initialState: CartState = {
    cart: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        itemUpdateQuantity: (
            state,
            action: PayloadAction<ActionCartItemsQuantityUpdated["payload"]>
        ) => {
            if (action.payload.quantity < 0) return;
            const pizza = state.cart.find(
                (pizza) => pizza.pizzaId === action.payload.pizzaId
            );
            if (pizza) {
                if (action.payload.quantity === 0) {
                    cartSlice.caseReducers.itemsRemove(state, {
                        type: CartActionTypes.CartItemsRemoved,
                        payload: { pizzaId: +action.payload.pizzaId },
                    });
                } else {
                    pizza.quantity = action.payload.quantity;
                    pizza.totalPrice =
                        action.payload.quantity * pizza.unitPrice;
                }
            } else {
                state.cart.push(action.payload);
            }
        },
        itemsRemove: (
            state,
            action: PayloadAction<ActionCartItemsRemoved["payload"]>
        ) => {
            if (action.payload) {
                state.cart = state.cart.filter(
                    (pizza) => pizza.pizzaId !== action.payload?.pizzaId
                );
            } else {
                state.cart = [];
            }
        },
    },
});
export const { itemUpdateQuantity, itemsRemove } = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state: RootState) => state.cart.cart;

export const getCartWithTotals = createSelector([getCart], (cart) => [
    ...cart,
    {
        pizzaId: "totals",
        name: "pizzas",
        ...cart.reduce(
            (prev, cartItem) => ({
                quantity: prev.quantity + cartItem.quantity,
                totalPrice: prev.totalPrice + cartItem.totalPrice,
            }),
            { quantity: 0, totalPrice: 0 }
        ),
    },
]);

export const getCartQuantity = createSelector([getCart], (cart) =>
    cart.reduce((prev, pizza) => prev + pizza.quantity, 0)
);

export const makeGetCartItemById = (pizzaId: number) =>
    createSelector(
        [getCart],
        (cart) => cart.find((pizza) => pizza.pizzaId === pizzaId)?.quantity || 0
    );
