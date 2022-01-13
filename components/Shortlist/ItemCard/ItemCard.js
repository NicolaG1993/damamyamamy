import Link from "next/link";
import Image from "next/image";
import styles from "./ItemCard.module.css";
import CartButton from "../../CartButton/CartButton";
import { useState } from "react";

export default function ItemCard({ product }) {
    const [isHovered, setIsHovered] = useState(false);
    const onMouseEnter = () => {
        setIsHovered(true);
    };
    const onMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            className={styles["product-content-wrap"]}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <Link href={`/item/${product.slug}`}>
                <a className={styles["product-content"]}>
                    <div className={styles["product-img"]}>
                        <Image
                            src={
                                product.images && product.images[0]
                                    ? product.images[0].location
                                    : "/pics/Logo.jpg"
                            }
                            alt={product.name}
                            className={styles["product-img-pic"]}
                            width="100%"
                            height="100%"
                            layout="responsive"
                        />
                        {/* objectFit="cover" */}
                    </div>
                    {/* <div className={"product-divider"}> </div> */}

                    <div className={styles["product-info"]}>
                        <h4>{product.name}</h4>
                        <div className={"product-divider-small"}> </div>

                        <h5>
                            <span
                                className={styles["price-for-small-card-tag"]}
                            >
                                Prezzo:{" "}
                            </span>
                            {product.price}€
                        </h5>
                    </div>
                </a>
            </Link>
            <CartButton
                showBtn={isHovered}
                wrapSize="small"
                product={product}
            />
        </div>
    );
}
