import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./style/Gallery.module.css";
import btnStyles from "../../../Header/HamburgerButton/HamburgerButton.module.css";

export default function Gallery({ toggleGallery, product, clickedPic }) {
    // console.log("product: ", product);
    const [focus, setFocus] = useState(product.images[clickedPic].location);
    const [picId, setPicId] = useState(product.images[clickedPic].key);

    const setFocusPic = (key, location) => {
        setFocus(location);
        setPicId(key);
    };

    return (
        <div className={styles["item-gallery-overlay"]}>
            <div
                id={btnStyles["hamBtn"]}
                className={`${styles["gallery-close-wrap"]} ${btnStyles["hamBtn-active"]}`}
                onClick={() => toggleGallery(null, false)}
            >
                <div className={btnStyles["stick"]}></div>
            </div>

            <div className={styles["item-gallery-wrap"]}>
                <div className={styles["gallery-focus-wrap"]}>
                    <div>
                        <Image
                            src={focus}
                            alt={product.name}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
                <div className={styles["gallery-pics-wrap"]}>
                    {product.images.map((pic) => (
                        <div key={pic.key}>
                            <Image
                                src={pic.location}
                                onClick={() =>
                                    setFocusPic(pic.key, pic.location)
                                }
                                alt={product.name}
                                width="90px"
                                height="90px"
                                layout="responsive"
                            />
                            {pic.key === picId && (
                                <div className={styles["gallery-pic-selected"]}>
                                    {" "}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// make it responsive 🐔
