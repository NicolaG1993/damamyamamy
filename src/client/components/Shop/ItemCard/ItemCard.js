import { Link } from "react-router-dom";
import "./style/ItemCard.css";

export default function ItemCard({ item }) {
    // console.log("item in ItemCard.js: ", item);

    return (
        <div className="item-card">
            <div className="ItemHeading">My name is {item.name}</div>
            <div className="ItemText">
                I'm a {item.animal} and my breed is {item.breed}
            </div>
            <div className="ItemText">
                My mantle is {item.skinTexture} {item.color}
            </div>
            <div className="ItemNumber">and i'm {item.age} years old</div>
        </div>
    );
}
