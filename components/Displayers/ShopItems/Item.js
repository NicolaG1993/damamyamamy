import CartButton from "@/components/Buttons/CartButton/CartButton";
import createMarkup from "@/utils/createMarkup";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./ShopItems.module.css";

export default function Item({ item }) {
    const [isHovered, setIsHovered] = useState(false);
    const onMouseEnter = () => {
        setIsHovered(true);
    };
    const onMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            className={styles.gridElement}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <Link title={item.name} href={`/negozio/articolo/${item.id}`}>
                <div id={styles.thumbnailWrap}>
                    <div
                        style={{
                            position: "relative",
                        }}
                        className={styles.picWrap}
                    >
                        <Image
                            src={
                                item.pics && item.pics.length
                                    ? item.pics[0]
                                    : "/no-image.png"
                            }
                            alt={item.name}
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>

                    <div className={styles.gridElementInfos}>
                        <h5 dangerouslySetInnerHTML={createMarkup(item.name)}>
                            {/* {item.name} */}
                        </h5>
                        <p>€ {item.price}</p>
                    </div>
                </div>
            </Link>
            <CartButton isVisibile={isHovered} wrapSize="small" item={item} />
        </div>
    );
}
