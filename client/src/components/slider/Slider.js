/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useState, useEffect, useRef, useCallback } from "react";

import SliderContent from "./SliderContent";
import Slide from "./Slide";
import Arrow from "./Arrow";
import Dots from "./Dots";

const getWidth = () => window.innerWidth;
// console.log("window: ", document.body.clientWidth);
// window.document.width();

/**
 * @function Slider
 */
const Slider = (props) => {
    const [parallaxHeight, setParallaxHeight] = useState();
    const [scrollTop, setScrollTop] = useState();

    const { slides } = props;

    const firstSlide = slides[0];
    const secondSlide = slides[1];
    const lastSlide = slides[slides.length - 1];

    const [state, setState] = useState({
        activeSlide: 0,
        translate: getWidth(),
        transition: 0.45,
        _slides: [lastSlide, firstSlide, secondSlide],
    });

    const { activeSlide, translate, _slides, transition } = state;

    const autoPlayRef = useRef();
    const transitionRef = useRef();
    const resizeRef = useRef();
    const sliderRef = useRef();

    const startAutoplay = () => {
        const slider = sliderRef.current;

        const play = () => {
            autoPlayRef.current();
        };

        const smooth = (e) => {
            if (e.target.className.includes("SliderContent")) {
                transitionRef.current();
            }
        };

        const resize = () => {
            resizeRef.current();
        };

        const transitionEnd = slider.addEventListener("transitionend", smooth);
        const onResize = window.addEventListener("resize", resize);

        let interval = null;

        if (props.autoPlay) {
            interval = setInterval(play, props.autoPlay * 1000);
        }

        return () => {
            //ma questa é la cleanup fn?!?!
            slider.removeEventListener("transitionend", transitionEnd);
            window.removeEventListener("resize", onResize);

            if (props.autoPlay) {
                clearInterval(interval);
            }
        };
    };

    const stopAutoplay = () => {
        //cleanup fn per annullare il timer sullo slider
        // autoPlayRef ???
    };

    useEffect(() => {
        autoPlayRef.current = nextSlide;
        transitionRef.current = smoothTransition;
        resizeRef.current = handleResize;
    });

    useEffect(() => {
        startAutoplay();
        window.addEventListener("scroll", handleScroll);

        // returned function will be called on component unmount
        return () => {
            stopAutoplay();
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (transition === 0) setState({ ...state, transition: 0.45 });
    }, [transition]);

    useEffect(() => {
        if (scrollTop > 150) {
            setParallaxHeight(`35vh`);
        } else {
            setParallaxHeight(`70vh`);
        }
    }, [scrollTop]);
    const handleScroll = () => {
        setScrollTop(window.scrollY);
    };

    const handleResize = () => {
        setState({ ...state, translate: getWidth(), transition: 0 });
    };

    const smoothTransition = () => {
        let _slides = [];

        // We're at the last slide.
        if (activeSlide === slides.length - 1)
            _slides = [slides[slides.length - 2], lastSlide, firstSlide];
        // We're back at the first slide. Just reset to how it was on initial render
        else if (activeSlide === 0)
            _slides = [lastSlide, firstSlide, secondSlide];
        // Create an array of the previous last slide, and the next two slides that follow it.
        else _slides = slides.slice(activeSlide - 1, activeSlide + 2);

        setState({
            ...state,
            _slides,
            transition: 0,
            translate: getWidth(),
        });
    };

    const nextSlide = () =>
        setState({
            ...state,
            translate: translate + getWidth(),
            activeSlide:
                activeSlide === slides.length - 1 ? 0 : activeSlide + 1,
        });

    const prevSlide = () =>
        setState({
            ...state,
            translate: 0,
            activeSlide:
                activeSlide === 0 ? slides.length - 1 : activeSlide - 1,
        });

    return (
        <div
            className={"sliderBox"}
            css={css`
                height: ${parallaxHeight};
                transition: 0.8s ease;
            `}
        >
            <div css={SliderCSS} ref={sliderRef}>
                <SliderContent
                    translate={translate}
                    transition={transition}
                    width={getWidth() * _slides.length}
                >
                    {_slides.map((_slide, i) => (
                        <Slide
                            width={getWidth()}
                            key={_slide + i}
                            content={_slide}
                        />
                    ))}
                </SliderContent>

                <Arrow direction="left" handleClick={prevSlide} />
                <Arrow direction="right" handleClick={nextSlide} />
            </div>
            <Dots slides={slides} activeSlide={activeSlide} />
        </div>
    );
};

const SliderCSS = css`
    position: relative;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    white-space: nowrap;
`;

export default Slider;

// video -> https://www.youtube.com/watch?v=N7W-S4JhMXY
// devo ancora analizzare per bene questo component (tipo useRef ?)
