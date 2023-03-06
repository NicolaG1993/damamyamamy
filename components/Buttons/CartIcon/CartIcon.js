import Link from "next/link";
import ShoppingCart from "public/assets/icons/shopping-cart.svg";
import styles from "./style/CartIcon.module.css";

import { useSelector, shallowEqual } from "react-redux";
import { selectCartState } from "@/redux/slices/cartSlice";

export default function CartIcon({ closeNav }) {
    let { cart } = useSelector(selectCartState);

    const TotalItems = () => {
        let total_items = cart.reduce((a, c) => a + c.quantity, 0);
        if (cart) {
            if (total_items > 0) {
                return <div id={styles["cartCounter"]}>{total_items}</div>;
            }
        }
    };

    return (
        <div className={styles["cart-icon-box"]}>
            <Link href="/carrello" onClick={closeNav}>
                <div className={styles["cart-icon"]}>
                    <ShoppingCart />
                </div>
                <TotalItems />
            </Link>
        </div>
    );
}
