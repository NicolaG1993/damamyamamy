import Link from "next/link";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../redux/LoadCart/loadCart.actions";

export default function CartItem({ item, styles }) {
    const dispatch = useDispatch();
    console.log("props in CartItem.js: ", item);
    return (
        <>
            {item.is_valid ? (
                <div>
                    <div className={styles["cart-product-content"]}>
                        <Link href={`/item/${item.product_id}`}>
                            <a>
                                <img src={item.media.source} alt={item.name} />
                                <div className={styles["cart-product-info"]}>
                                    <h4>{item.name}</h4>
                                    <h5>€ {item.price.raw}</h5>
                                </div>
                            </a>
                        </Link>
                        <button
                            className={styles["cart-remove-button"]}
                            onClick={() =>
                                dispatch(removeFromCart({ productId: item.id }))
                            }
                        >
                            X
                        </button>
                    </div>

                    <div className={styles["white-separator"]}></div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

// btn deve switchare to remove se item é gia in cart 🐔
