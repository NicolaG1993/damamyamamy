import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { cartAddItem, cartRemoveItem } from "../../../redux/Cart/cart.actions";
import axios from "axios";

export default function CartItem({ item, styles }) {
    const dispatch = useDispatch();
    console.log("props in CartItem.js: ", item);

    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/product/${item.slug}`);
        console.log("data:", data);
        if (data.count_in_stock < quantity) {
            window.alert("Sorry, product is out of stock");
            return;
        }
        dispatch(cartAddItem({ ...item, quantity }));
    };

    return (
        <div>
            <div className={styles["cart-product-content"]}>
                <Link href={`/item/${item.slug}`}>
                    <a>
                        <div>
                            <Image
                                src={item.images[0].location}
                                alt={item.name}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className={styles["cart-product-name"]}>
                            <h4>{item.name}</h4>
                        </div>
                    </a>
                </Link>

                <div className={styles["cart-product-info"]}>
                    <div>
                        <select
                            name="quantity"
                            id="quantity"
                            value={item.quantity}
                            onChange={(e) =>
                                updateCartHandler(item, Number(e.target.value))
                            }
                        >
                            {[...Array(item.count_in_stock).keys()].map((i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>

                        <h5>€ {item.price}</h5>
                    </div>
                </div>

                <button
                    className={styles["cart-remove-button"]}
                    onClick={() => dispatch(cartRemoveItem(item))}
                >
                    X
                </button>
            </div>

            <div className={styles["white-separator"]}></div>
        </div>
    );
}

// btn deve switchare to remove se item é gia in cart 🐔
