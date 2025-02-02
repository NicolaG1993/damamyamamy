import createMarkup from "@/utils/createMarkup"; // 🧠 TODO: FIX, there must be another solution then dangerouslySetInnerHTML
import Image from "next/image";
import Link from "next/link";
import styles from "./ShopItems.module.css";

export default function ShopItemPreview({ item }) {
    return (
        <div className={styles.gridElement}>
            <Link title={item.name} href={`/articolo/${item.slug}`}>
                <div id={styles.thumbnailWrap}>
                    <div
                        style={{
                            position: "relative",
                        }}
                        className={styles.picWrap}
                    >
                        <Image
                            src={item.pic ? item.pic : "/no-image.png"}
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
        </div>
    );
}
