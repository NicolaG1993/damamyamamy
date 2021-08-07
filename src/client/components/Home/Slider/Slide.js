import { memo } from "react";

const Slide = ({ content, width }) => {
    return (
        <div
            style={{
                height: "100%",
                width: `${width}px`,
                backgroundImage: `url(${content})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        />
    );
};

export default memo(Slide);
