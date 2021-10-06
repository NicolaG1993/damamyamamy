import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../redux/LoadCart/loadCart.actions";

export default function CartItem({ item }) {
    const dispatch = useDispatch();
    console.log("props in CartItem.js: ", item);
    return (
        <div>
            <div className={"cart-product-content"}>
                <Link to={`/item/${item.product_id}`}>
                    <img src={item.media.source} alt={item.name} />
                    <div className="cart-product-info">
                        <h4>{item.name}</h4>
                        <h5>€ {item.price.raw}</h5>
                    </div>
                </Link>
                <button
                    className="cart-remove-button"
                    onClick={() =>
                        dispatch(removeFromCart({ productId: item.id }))
                    }
                >
                    X
                </button>
            </div>

            <div className="white-separator"></div>
        </div>
    );
}

// btn deve switchare to remove se item é gia in cart 🐔
