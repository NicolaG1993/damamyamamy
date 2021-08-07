import { memo } from "react";

const Dot = ({ active }) => {
    return (
        <span
            style={{
                padding: "6px",
                margin: "5px",
                borderRadius: "50%",
                background: `${
                    active ? "rgb(231, 134, 235)" : "rgb(205,205,205)"
                }`,
            }}
        />
    );
};

const MemoDot = memo(Dot);

const Dots = ({ slides, activeSlide }) => {
    return (
        <div
            style={{
                position: "absolute",
                bottom: "-60px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {slides.map((slide, i) => (
                <MemoDot key={slide} active={activeSlide === i} />
            ))}
        </div>
    );
};

export default Dots;
