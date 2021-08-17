import { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
    addToCart,
    removeFromCart,
} from "../../redux/LoadCart/loadCart.actions";
import "./style/CartButton.css";
import ShoppingCart from "./assets/shopping-cart.svg";
import X from "./assets/x.svg";

const loadNotAvailables = (state) => state.loadCart.notAvailables;

export default function CartButton({ wrapSize, product_id }) {
    const dispatch = useDispatch();
    const [isAvailable, setIsAvailable] = useState(false);
    const [itemId, setItemId] = useState("");
    // console.log("product_id: ", product_id);
    // console.log("itemId: ", itemId);
    //questo mi serve per remove!! ma non per add 🧨
    //https://commercejs.com/docs/sdk/cart/#remove-from-cart

    let notAvailables = useSelector(loadNotAvailables, shallowEqual);
    // console.log("notAvailables: ", notAvailables);

    useEffect(() => {
        if (notAvailables) {
            let result = notAvailables.filter((i) => {
                return i.product_id === product_id;
            }); // se notAvailables esiste, cerca se contiene un item con questo product_id

            if (result.length === 0) {
                setIsAvailable(true); //se non torna nessun risultato allora é disponibile
            } else {
                setItemId(result[0].item_id); //altrimenti non lo é, estraiamo il suo item_id (ci serve per remove req to commerce.js)
                setIsAvailable(false); //settiamo stato su non disponibile
            }
        }
    }, [notAvailables]);

    const SmallCartButton = () =>
        isAvailable ? (
            <button
                className="add-cart add-cart-for-small"
                onClick={() =>
                    dispatch(addToCart({ productId: product_id, quantity: 1 }))
                }
            >
                <ShoppingCart />
            </button>
        ) : (
            <button
                className="remove-cart remove-cart-for-small"
                onClick={() => dispatch(removeFromCart({ productId: itemId }))}
            >
                <X />
            </button>
        );

    const LargeCartButton = () =>
        isAvailable ? (
            <button
                className="btn normal"
                onClick={() =>
                    dispatch(addToCart({ productId: product_id, quantity: 1 }))
                }
            >
                Aggiungi al carrello
            </button>
        ) : (
            <button
                className="btn normal"
                onClick={() => dispatch(removeFromCart({ productId: itemId }))}
            >
                Rimuovi dal carrello
            </button>
        );

    return (
        <>
            {wrapSize === "small" && <SmallCartButton />}
            {wrapSize === "large" && <LargeCartButton />}
        </>
    );
}
