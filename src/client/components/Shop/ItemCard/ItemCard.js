import { Link } from "react-router-dom";
import "./style/ItemCard.css"; // not loading right

export default function ItemCard({ item }) {
    console.log("🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️item in ItemCard.js: ", item);

    function createMarkup() {
        return { __html: item.description };
    }

    return (
        <div className={"item-card"}>
            {/* <Link to={`/item/${item.id}`} className={"product-content-medium"}> */}
            <div className={"item-card-img"}>
                <img src={item.media.source || "test1.jpg"} />
            </div>

            <div className={"item-card-info"}>
                <h3>{item.name}</h3>

                <div className={"item-card-divider-small"}> </div>
                <div
                    className={"item-card-description"}
                    dangerouslySetInnerHTML={createMarkup()}
                ></div>

                <h5>
                    <span className={"price-for-item-card"}>Prezzo: </span>
                    {item.price.raw}€
                </h5>
            </div>
            {/* </Link> */}
            {/* {notAvailables && notAvailables.filter} */}
            {/* <AddToCartBtn
                cardSize={cardSize}
                item_id={item.id}
                notAvailables={notAvailables}
                onAddToCart={onAddToCart}
                removeFromCart={removeFromCart}
            /> */}
        </div>
    );
}
