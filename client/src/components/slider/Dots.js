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
                background: ${active
                    ? "rgba(250,250,250, 0.8)"
                    : "rgba(232,232,232, 0.3)"};
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
                bottom: 5px;
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
