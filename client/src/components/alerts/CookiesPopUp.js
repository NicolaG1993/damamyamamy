import "../../styles/CookiesPopUp.css";

export default function CookiesPopUp({ toggleCookieAlert }) {
    return (
        <div className="bottom-alert-comp">
            <h3>Questo sito utilizza cookies</h3>
            <p>
                We and our partners store or access information on devices, such
                as cookies and process personal data, such as unique identifiers
                and standard information sent by a device for the purposes
                described below. You may click to consent to our and our
                partners’ processing for such purposes. Alternatively, you may
                click to refuse to consent, or access more detailed information
                and change your preferences before consenting. Your preferences
                will apply to this website only. Please note that some
                processing of your personal data may not require your consent,
                but you have a right to object to such processing. You can
                change your preferences at any time by returning to this site or
                visit our privacy policy.
            </p>
            <button className="layout-button btn2" onClick={toggleCookieAlert}>
                Conferma
            </button>
        </div>
    );
}
