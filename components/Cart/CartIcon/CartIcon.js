import Link from "next/link";
import ShoppingCart from "./assets/shopping-cart.svg";
import styles from "./style/CartIcon.module.css";

import { useSelector, shallowEqual } from "react-redux";
const selectTotalItems = (state) => state.cart.cartItems;

export default function CartIcon({ closeNav }) {
    let cart = useSelector(selectTotalItems, shallowEqual);

    const TotalItems = () => {
        let total_items = cart.reduce((a, c) => a + c.quantity, 0);
        if (cart) {
            if (total_items > 0) {
                return <div id={styles["cartCounter"]}>{total_items}</div>;
            } else {
                return null;
            }
        } else {
            return null;
        }
    };

    return (
        <div className={styles["cart-icon-box"]}>
            <Link href="/cart" onClick={closeNav}>
                <a>
                    <div className={styles["cart-icon"]}>
                        <ShoppingCart />
                    </div>
                    <TotalItems />
                </a>
            </Link>
        </div>
    );
}
