import loadable from "@loadable/component";
import { useDispatch } from "react-redux";
import { toggleLayout } from "../../redux/ToggleLayout/toggleLayout.actions";
import "./style/Home.css";

const Slider = loadable(() => import("./Slider/Slider"));
import Button from "../Button/Button";

export default function Home() {
    const dispatch = useDispatch();
    const toggle = () => {
        dispatch(toggleLayout({ id: "overlay", fn: "toggle" }));
    };

    const style = {
        color: "red",
        textAlign: "center",
    };

    return (
        <div id="Home" style={style}>
            <Slider fallback={<div className="loader" />} />
            Home component is here!
            <div className="hello"></div>
            <Button
                page="http://www.instagram.com"
                text="Visit our Instagram page"
                type="external"
            />
            <br />
            <br />
            <Button page="/about" text="About us" type="internal" />
            <br />
            <br />
            <Button fn={toggle} text="Toggle Overlay" type="function" />
        </div>
    );
}
