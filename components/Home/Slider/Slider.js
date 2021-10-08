import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./style/Slider.module.css";
// import slides from "./assets/images";

import useScrollPosition from "../../../shared/utils/useScrollPosition";
// import useWindowDimensions from "../../../utils/useWindowDimensions";

import SliderContent from "./SliderContent";
import Slide from "./Slide";
import Arrow from "./Arrow";
import Dots from "./Dots";

import PicA from "./assets/pics/test4.jpg";
import PicB from "./assets/pics/pic4.jpg";
import PicC from "./assets/pics/pic3.jpg";
import PicD from "./assets/pics/pic2a.jpg";

export default function Slider({ width }) {
    let slides = [PicA, PicB, PicC, PicD];
    const { scrollTop } = useScrollPosition();
    // const { width } = useWindowDimensions();
    // console.log("slides", slides);

    const [parallaxHeight, setParallaxHeight] = useState();
    const autoPlay = 10;

    const firstSlide = slides[0];
    const secondSlide = slides[1];
    const lastSlide = slides[slides.length - 1];

    const [state, setState] = useState({
        activeSlide: 0,
        translate: width,
        transition: 0.45,
        _slides: [lastSlide, firstSlide, secondSlide],
    });
    const { activeSlide, translate, _slides, transition } = state;

    const autoPlayRef = useRef();
    const transitionRef = useRef();
    const resizeRef = useRef();
    const sliderRef = useRef();

    useEffect(() => {
        autoPlayRef.current = nextSlide;
        transitionRef.current = smoothTransition;
        resizeRef.current = handleResize;
    }); // run on every render

    useEffect(() => {
        const slider = sliderRef.current;

        const smooth = (e) => {
            if (e.target.className.includes(styles["SliderContent"])) {
                transitionRef.current();
            }
        };

        const transitionEnd = slider.addEventListener("transitionend", smooth);

        // returned function will be called on component unmount
        return () => {
            slider.removeEventListener("transitionend", transitionEnd);
        };
    }, []); // run only when component mount

    useEffect(() => {
        if (transition === 0) setState({ ...state, transition: 0.45 });
    }, [transition]);

    useEffect(() => {
        const play = () => {
            autoPlayRef.current();
        };
        let interval = null;
        if (autoPlay) {
            interval = setInterval(play, autoPlay * 1000);
        }
        return () => {
            if (autoPlay) {
                clearInterval(interval);
            }
        };
    }, [activeSlide]);

    useEffect(() => {
        if (scrollTop > 150) {
            setParallaxHeight(`35vh`);
        } else {
            setParallaxHeight(`70vh`);
        }
    }, [scrollTop]);

    const handleResize = () =>
        setState({ ...state, translate: width, transition: 0 });

    useEffect(() => {
        console.log("width changed!", width);
        handleResize();
    }, [width]);

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
            translate: width,
        });
    };

    const nextSlide = () =>
        setState({
            ...state,
            translate: translate + width,
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
            className={styles["sliderBox"]}
            style={{ height: `${parallaxHeight}`, transition: "0.8s ease" }}
        >
            <div style={SliderCSS} ref={sliderRef}>
                <SliderContent
                    translate={translate}
                    transition={transition}
                    width={width * _slides.length}
                >
                    {_slides.map((_slide, i) => (
                        <Slide
                            width={width}
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
}

const SliderCSS = {
    position: "relative",
    height: "100%",
    width: "100%",
    margin: "0 auto",
    overflow: "hidden",
    whiteSpace: "nowrap",
};

// video -> https://www.youtube.com/watch?v=N7W-S4JhMXY
// devo ancora analizzare per bene questo component (tipo useRef ?)
