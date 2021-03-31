import { Link } from "react-router-dom";

import Login from "./Login";
import Registration from "./Registration";

export default function Access(props) {
    return (
        <div
            className={`access-overlay ${
                props.accessForm ? "visible" : "hidden"
            }`}
        >
            <Login toggleAccessForm={props.toggleAccessForm} />
        </div>
    );
}
