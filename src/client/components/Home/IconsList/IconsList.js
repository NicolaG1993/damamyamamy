import { Link } from "react-router-dom";
import "./style/IconsList.css";

export default function IconsList({ iconslistHeight }) {
    return (
        <div className="iconslist" style={{ height: iconslistHeight }}>
            <div className="iconslist-wrap">
                <div className="iconslist-icon-box">
                    <div className="iconslist-icon"></div>
                    <h3>Affidabilità</h3>
                    <p>
                        Offriamo il migliore servizio, controllando ogni
                        prodotto
                    </p>
                </div>
                <div className="iconslist-icon-box">
                    <div className="iconslist-icon"></div>
                    <h3>Qualità</h3>
                    <p>
                        Da noi puoi aspettarti solo articoli in ottime
                        condizioni
                    </p>
                </div>
                <div className="iconslist-icon-box">
                    <div className="iconslist-icon"></div>
                    <h3>Sicurezza</h3>
                    <p>I prodotti per bambini sono sicuri al 100% </p>
                </div>
                <div className="iconslist-icon-box">
                    <div className="iconslist-icon"></div>
                    <h3>Rimborsi</h3>
                    <p>In caso di prodotti rovinati é previsto il rimborso</p>
                </div>
            </div>
        </div>
    );
}
