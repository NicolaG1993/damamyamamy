// REACT
import ReactDOM from "react-dom";
import "./style/CookiesPopUp.css";
import Button from "../Button/Button";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { toggleLayout } from "../../redux/ToggleLayout/toggleLayout.actions";

// COMPONENT
export default function CookiesPopUp() {
    return <Modal />;
}

// COMPONENTS
const Modal = () => {
    // REDUX
    const modalStatus = useSelector(
        (state) => state.toggleLayout && state.toggleLayout.layouts[2].active
    );

    // let state = useSelector((state) => state);
    // let status = state.toggleLayout.layouts[2].active || false;
    return modalStatus
        ? ReactDOM.createPortal(<Alert />, document.getElementById("root"))
        : null;
};

//  Creo Alert Component solo per tenere tutto piu separato
const Alert = () => {
    // REDUX
    const dispatch = useDispatch();
    const close = () => {
        dispatch(toggleLayout({ id: "alert", fn: "close" }));
    };
    return (
        <div className="alert">
            <div className="alert-text-wrap">
                <h3>Questo sito utilizza cookies</h3>
                <p>
                    We and our partners store or access information on devices,
                    such as cookies and process personal data, such as unique
                    identifiers and standard information sent by a device for
                    the purposes described below. You may click to consent to
                    our and our partners’ processing for such purposes.
                    Alternatively, you may click to refuse to consent, or access
                    more detailed information and change your preferences before
                    consenting. Your preferences will apply to this website
                    only. Please note that some processing of your personal data
                    may not require your consent, but you have a right to object
                    to such processing. You can change your preferences at any
                    time by returning to this site or visit our privacy policy.
                    <br />
                </p>
            </div>
            <div className="alert-buttons-wrap">
                <Button text="Ho capito" type="function" fn={close} />
                <Button
                    page="/document"
                    text="Maggiori informazioni"
                    type="internal"
                    fn={close}
                />
            </div>
        </div>
    );
};
