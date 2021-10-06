import styles from "./style/Slider.module.css";

const SliderContent = (props) => (
    <div
        style={{
            transform: `translateX(-${props.translate}px)`,
            transition: `transform ease-out ${props.transition}s`,
            height: "100%",
            width: `${props.width}px`,
            display: "flex",
        }}
    >
        {props.children}
    </div>
);

export default SliderContent;
