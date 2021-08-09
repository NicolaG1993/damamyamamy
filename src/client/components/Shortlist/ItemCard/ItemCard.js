import { Link } from "react-router-dom";
import "./ItemCard.css";

export default function ItemCard({ product }) {
    return (
        <div className={"product-content"}>
            <Link
                to={`/item/${product.id}`}
                className={"product-content-small"}
            >
                <div className={"product-img"}>
                    <img src={product.media.source || "test1.jpg"} />
                </div>
                {/* <div className={"product-divider"}> </div> */}

                <div className={"product-info"}>
                    <h4>{product.name}</h4>
                    <div className={"product-divider-small"}> </div>

                    <h5>
                        <span className={"price-for-small-card-tag"}>
                            Prezzo:{" "}
                        </span>
                        {product.price.raw}€
                    </h5>
                </div>
            </Link>
        </div>
    );
}
