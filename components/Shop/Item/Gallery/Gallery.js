import { useState, useEffect } from "react";
import styles from "./style/Gallery.module.css";
import btnStyles from "../../../Header/HamburgerButton/HamburgerButton.module.css";

export default function Gallery({ toggleGallery, item, clickedPic }) {
    // console.log("item: ", item);
    const [focus, setFocus] = useState(item.assets[clickedPic].url);
    const [picId, setPicId] = useState(item.assets[clickedPic].id);

    const setFocusPic = (id, url) => {
        setFocus(url);
        setPicId(id);
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
                        <img src={focus} />
                    </div>
                </div>
                <div className={styles["gallery-pics-wrap"]}>
                    {item.assets.map((pic) => (
                        <div key={pic.id}>
                            <img
                                src={pic.url}
                                onClick={() => setFocusPic(pic.id, pic.url)}
                            />
                            {pic.id === picId && (
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
