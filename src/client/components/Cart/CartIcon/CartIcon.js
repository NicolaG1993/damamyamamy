import { Link } from "react-router-dom";
import ShoppingCart from "./assets/shopping-cart.svg";
import "./style/CartIcon.css";

export default function CartIcon({ cart, closeNav }) {
    return (
        <div className={"cart-icon-box"}>
            <Link to={"/cart"} onClick={closeNav}>
                <div className={"cart-icon"}>
                    <ShoppingCart />
                </div>

                {cart && <div id="cartCounter">{cart.total_items}</div>}
            </Link>
        </div>
    );
}
