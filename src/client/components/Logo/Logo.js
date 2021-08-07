import "./style/Logo.css";
import LogoSVG from "./assets/Logo.svg";
// import logo from "./assets/logo512.png";

export default function Logo() {
    return (
        <div className="logo">
            <LogoSVG />
            {/* <img src={logo} alt="logo" /> */}
        </div>
    );
}
