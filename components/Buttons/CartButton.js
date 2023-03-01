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
        console.log("CART: ", cart);
        // check if item is in cart already
        if (cart) {
            let cartItem = checkCart(item.id, cart);
            !cartItem ? setIsAvailable(true) : setIsAvailable(false);
        }
    }, [cart]);

    // find element in cart
    const checkCart = (itemID, cart) => cart.find(({ id }) => id === itemID);

    // add item to cart
    const addToCartHandler = async (itemID, quantity) => {
        try {
            // check cart and add cartQuantity, i don't really need it in this case, but whatever
            let cartItem = checkCart(itemID, cart);
            let cartQuantity =
                cartItem && cartItem.quantity ? cartItem.quantity : 0;
            let totalQuantity = cartQuantity + quantity;
            // check stock, if available add to cart
            let dbCheck = await checkItemStock(itemID, totalQuantity);
            dbCheck &&
                dispatch(addToCart({ id: itemID, quantity: totalQuantity }));
        } catch (err) {
            alert(getError(err));
        }
    };

    // remove item from cart
    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    };

    const SmallCartButton = () =>
        isAvailable ? (
            <button
                className="button cartActionButton"
                // className={`${styles["add-cart"]} ${
                //     styles["add-cart-for-small"]
                // } ${showBtn ? styles["show"] : ""}`}
                onClick={() => addToCartHandler(item.id, 1)}
            >
                {/* <ShoppingCart /> */}+
            </button>
        ) : (
            <button
                className="button cartActionButton"
                // className={`${styles["remove-cart"]} ${
                //     styles["remove-cart-for-small"]
                // } ${showBtn ? styles["show"] : ""}`}
                onClick={() => removeFromCartHandler(item.id)}
            >
                {/* <X /> */}-
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
