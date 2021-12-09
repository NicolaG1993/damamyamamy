import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import CartButton from "../../CartButton/CartButton";
import styles from "./style/ItemCard.module.css"; // not loading right

export default function ItemCard({ item }) {
    // console.log("🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️item in ItemCard.js: ", item);

    //HOVER STYLE
    const [isHovered, setIsHovered] = useState(false);
    const onMouseEnter = () => {
        setIsHovered(true);
    };
    const onMouseLeave = () => {
        setIsHovered(false);
    };

    function createMarkup() {
        return { __html: item.description };
    }

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`${"fade-selector"} ${styles["shop-item-wrap"]}`}
        >
            <Link href={`/item/${item.slug}`}>
                <a>
                    <div className={styles["item-card"]}>
                        {/* <Link to={`/item/${item.id}`} className={"product-content-medium"}> */}
                        <div className={styles["item-card-img"]}>
                            <Image
                                src={item.images[0] || "/pics/Logo.jpg"}
                                alt={item.name}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>

                        <div className={styles["item-card-info"]}>
                            <h3>{item.name}</h3>

                            <div className={styles["item-card-divider-small"]}>
                                {" "}
                            </div>
                            <div
                                className={styles["item-card-description"]}
                                dangerouslySetInnerHTML={createMarkup()}
                            ></div>

                            <h5>
                                <span className={styles["price-for-item-card"]}>
                                    Prezzo:{" "}
                                </span>
                                {item.price}€
                            </h5>
                        </div>
                        {/* </Link> */}
                        {/* {notAvailables && notAvailables.filter} */}
                        {/* <AddToCartBtn
                cardSize={cardSize}
                item_id={item.id}
                notAvailables={notAvailables}
                onAddToCart={onAddToCart}
                removeFromCart={removeFromCart}
            /> */}
                    </div>
                </a>
            </Link>

            <CartButton
                showBtn={isHovered}
                wrapSize="small"
                product_id={item.id}
            />
        </div>
    );
}
