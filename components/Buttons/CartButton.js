import { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import styles from "./style/CartButton.module.css";

// import ShoppingCart from "./assets/shopping-cart.svg";
// import X from "./assets/x.svg";
import axios from "axios";
import {
    selectCartState,
    addToCart,
    removeFromCart,
} from "@/redux/slices/cartSlice";
import { checkItemStock } from "@/utils/custom/handlers";
import { getError } from "@/utils/error";

export default function CartButton({ isVisibile, wrapSize, item }) {
    const dispatch = useDispatch();
    let { cart } = useSelector(selectCartState, shallowEqual);
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        console.log("cart: ", cart);
        if (cart) {
            let result = cart.filter((i) => {
                return i.id === item.id;
            });

            if (result.length === 0) {
                setIsAvailable(true);
            } else {
                setIsAvailable(false);
            }
        }
    }, [cart]);

    const addToCartHandler = async (itemID, quantity) => {
        try {
            let cartItem = cart.find(({ id }) => id === itemID);
            let cartQuantity =
                cartItem && cartItem.quantity ? cartItem.quantity : 0;
            let totalQuantity = cartQuantity + quantity;

            let dbCheck = await checkItemStock(itemID, totalQuantity);
            dbCheck &&
                dispatch(addToCart({ id: itemID, quantity: totalQuantity }));
        } catch (err) {
            alert(getError(err));
        }
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const SmallCartButton = () =>
        isAvailable ? (
            <button
                // className={`${styles["add-cart"]} ${
                //     styles["add-cart-for-small"]
                // } ${showBtn ? styles["show"] : ""}`}
                onClick={() => addToCartHandler(item.id, 1)}
            >
                {/* <ShoppingCart /> */} +
            </button>
        ) : (
            <button
                // className={`${styles["remove-cart"]} ${
                //     styles["remove-cart-for-small"]
                // } ${showBtn ? styles["show"] : ""}`}
                onClick={() => removeFromCartHandler(item.id)}
            >
                {/* <X /> */} -
            </button>
        );

    const LargeCartButton = () => {};

    return (
        <>
            {wrapSize === "small" && <SmallCartButton />}
            {wrapSize === "large" && <LargeCartButton />}
        </>
    );
}
