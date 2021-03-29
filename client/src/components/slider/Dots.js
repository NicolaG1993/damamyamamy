/** @jsxRuntime classic */
/** @jsx jsx */
import React, { memo } from "react";
import { css, jsx } from "@emotion/react";

const Dot = ({ active }) => {
    return (
        <span
            css={css`
                padding: 6px;
                margin-right: 5px;
                cursor: pointer;
                border-radius: 50%;
                background: ${active ? "rgb(201,201,201)" : "rgb(232,232,232)"};
            `}
        />
    );
};

const MemoDot = memo(Dot);

const Dots = ({ slides, activeSlide }) => {
    return (
        <div
            css={css`
                position: absolute;
                bottom: -30px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            `}
        >
            {slides.map((slide, i) => (
                <MemoDot key={slide} active={activeSlide === i} />
            ))}
        </div>
    );
};

export default Dots;
