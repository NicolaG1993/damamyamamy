/* eslint-disable indent */
import { FETCH_CART, HANDLE_CART } from "./loadCart.types";

const INITIAL_STATE = { notAvailables: [] };

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_CART: {
            let cart = action.payload;
            console.log("FETCH_CART: ", action.payload);

            const addedItems =
                cart &&
                cart.line_items.map((obj) => ({
                    item_id: obj.id,
                    product_id: obj.product_id,
                })); //forse posso evitarla questa essendo giá in cart

            return {
                ...state,
                cart: cart,
                notAvailables: addedItems,
            };
        }

        case HANDLE_CART: {
            let { cart } = action.payload;
            console.log("HANDLE_CART: ", cart);

            let addedItems;
            if (cart) {
                addedItems = cart.line_items.map((obj) => ({
                    item_id: obj.id,
                    product_id: obj.product_id,
                }));
            }
            //  console.log("HANDLE_CART: ", addedItems);
            return { ...state, cart: cart, notAvailables: addedItems };
        }

        default:
            return state;
    }
}
