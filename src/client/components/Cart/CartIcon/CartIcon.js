import { Link } from "react-router-dom";
import ShoppingCart from "./assets/shopping-cart.svg";
import "./style/CartIcon.css";

import { useSelector, shallowEqual } from "react-redux";
const selectTotalItems = (state) => state.loadCart.cart;

export default function CartIcon({ closeNav }) {
    let cart = useSelector(selectTotalItems, shallowEqual);

    const TotalItems = () => {
        if (cart) {
            if (cart.total_items > 0) {
                return <div id="cartCounter">{cart.total_items}</div>;
            } else {
                return null;
            }
        } else {
            return null;
        }
    };

    return (
        <div className={"cart-icon-box"}>
            <Link to={"/cart"} onClick={closeNav}>
                <div className={"cart-icon"}>
                    <ShoppingCart />
                </div>
                <TotalItems />
            </Link>
        </div>
    );
}
