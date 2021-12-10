import { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { cartAddItem, cartRemoveItem } from "../../redux/Cart/cart.actions";
import styles from "./style/CartButton.module.css";

import ShoppingCart from "./assets/shopping-cart.svg";
import X from "./assets/x.svg";
import axios from "axios";

const loadNotAvailables = (state) => state.cart.cartItems;

const STATUS = {
    HOVERED: "hovered",
    NORMAL: "normal",
};

export default function CartButton({ showBtn, wrapSize, product }) {
    const [status, setStatus] = useState(STATUS.NORMAL);
    const onMouseEnter = () => {
        setStatus(STATUS.HOVERED);
    };
    const onMouseLeave = () => {
        setStatus(STATUS.NORMAL);
    };
    //questo metodo puó sembrare essere piú codice del dovuto, ma in veritá risolve un bug
    //in Item quando premiamo per aggingere/rimuovere per una frazione di secondo lo state non é hovered con pure css
    //cosí invece non succede, il btn status é sempre hovered
    //NB che in Item per qualche motivo ignora transition, quindi niente fading lí con questo metodo
    //Ho giá provato a copiare ed incollare css da Button component
    const dispatch = useDispatch();
    const [isAvailable, setIsAvailable] = useState(false);
    // const [itemId, setItemId] = useState("");
    // console.log("product.id: ", product.id);
    // console.log("itemId: ", itemId);
    //questo mi serve per remove!! ma non per add 🧨
    //https://commercejs.com/docs/sdk/cart/#remove-from-cart

    let notAvailables = useSelector(loadNotAvailables, shallowEqual);
    // console.log("notAvailables: ", notAvailables);

    useEffect(() => {
        if (notAvailables) {
            let result = notAvailables.filter((i) => {
                return i.id === product.id;
            }); // se notAvailables esiste, cerca se contiene un item con questo product.id

            if (result.length === 0) {
                setIsAvailable(true); //se non torna nessun risultato allora é disponibile
            } else {
                // setItemId(result[0].item_id); //altrimenti non lo é, estraiamo il suo item_id (ci serve per remove req to commerce.js)
                setIsAvailable(false); //settiamo stato su non disponibile
            }
        }
    }, [notAvailables]);

    const addToCartHandler = async (product, quantity) => {
        // const existItem = notAvailables.find((x) => x.id === product.id);
        // const quantity = existItem ? existItem.quantity + 1 : 1;
        //cosí incrementa quantity se prodotto é gia in carrello
        //in alternativa si puó modificare per switchare il button su REMOVE, o per altro

        //controlliamo via API che il prodotto sia ancora in stock, live.
        const { data } = await axios.get(`/api/product/${product.slug}`);

        if (data.count_in_stock < quantity) {
            window.alert("Sorry, the required quantity is not available");
            return;
        }

        dispatch(cartAddItem({ ...data, quantity }));
    };

    const SmallCartButton = () =>
        isAvailable ? (
            <button
                className={`${styles["add-cart"]} ${
                    styles["add-cart-for-small"]
                } ${showBtn ? styles["show"] : ""}`}
                onClick={() => addToCartHandler(product, 1)}
            >
                <ShoppingCart />
            </button>
        ) : (
            <button
                className={`${styles["remove-cart"]} ${
                    styles["remove-cart-for-small"]
                } ${showBtn ? styles["show"] : ""}`}
                onClick={() => dispatch(cartRemoveItem(product))}
            >
                <X />
            </button>
        );

    const LargeCartButton = () =>
        isAvailable ? (
            <button
                className={`${styles["btn"]} ${styles[status]}`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={() => addToCartHandler(product, 1)}
            >
                Aggiungi al carrello
            </button>
        ) : (
            <button
                className={`${styles["btn"]} ${styles[status]}`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={() => dispatch(cartRemoveItem(product))}
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
