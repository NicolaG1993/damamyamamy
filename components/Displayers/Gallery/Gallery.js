import Image from "next/image";
import styles from "./Gallery.module.css";
import { useState } from "react";

export default function Gallery({ close, pics, i }) {
    const [selected, setSelected] = useState(i);

    return (
        <div id={styles.Gallery}>
            <span onClick={close}>Torna indietro</span>
            <div>
                <Image
                    src={pics[i]}
                    alt={"Immagine selezionata"}
                    fill
                    style={{
                        objectFit: "contain",
                    }}
                />
            </div>
            <nav>
                {pics.map((p, i) => (
                    <Image
                        key={"Gallery pic: " + i}
                        src={p}
                        alt={"Immagine"}
                        width={100}
                        height={100}
                        style={{
                            objectFit: "cover",
                        }}
                        onClick={() => setSelected(i)}
                    />
                ))}
            </nav>
        </div>
    );
}
