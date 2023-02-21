import Image from "next/image";
import styles from "./Slider.module.css";
import { useState, useEffect } from "react";

const slides = [
    {
        src: "https://res.cloudinary.com/dg4i4hspr/image/upload/v1676941571/damamyamamy.com/pic3_aczqx2.jpg",
        alt: "Third slider picture",
    },
    {
        src: "https://res.cloudinary.com/dg4i4hspr/image/upload/v1676941571/damamyamamy.com/pic4_qxfqje.jpg",
        alt: "First slider picture",
    },
    {
        src: "https://res.cloudinary.com/dg4i4hspr/image/upload/v1676941571/damamyamamy.com/pic2a_b3pkir.jpg",
        alt: "Second slider picture",
    },
];

export default function Slider({}) {
    const [activeSlide, setActiveSlide] = useState(0);
    const autoPlay = 6;

    const nextSlide = () => {
        setActiveSlide(activeSlide === slides.length - 1 ? 0 : activeSlide + 1);
    };

    useEffect(() => {
        let interval = null;
        const play = () => {
            nextSlide();
        };

        if (autoPlay) {
            interval = setInterval(play, autoPlay * 1000);
        }

        return () => {
            if (autoPlay) {
                clearInterval(interval);
            }
        };
    }, [activeSlide]);

    return (
        <section id={styles.Slider}>
            {slides.map((img, i) => (
                <div
                    key={img.alt}
                    className={styles["slide"]}
                    style={{
                        width: `100%`,
                        height: `100%`,
                        // position: "relative",
                        opacity: Number(activeSlide) === Number(i) ? 1 : 0,
                        transition: "opacity 0.5s ease-in-out",
                    }}
                >
                    <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        style={{
                            objectFit: "cover",
                        }}
                    />
                </div>
            ))}
        </section>
    );
}
