import axios from "/client/src/axios";
import { Component } from "react";
import { Link } from "react-router-dom";

import Slider from "../slider/Slider";
import images from "../slider/img/images";
import ItemsListShort from "../items-list-short/ItemsListShort";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
        };
    }

    async componentDidMount() {
        console.log("Home component did mount");
        console.log("this.props: ", this.props);
    }

    render() {
        console.log("this.state in home: ", this.state);

        return (
            <div id="home">
                <Slider slides={images} />

                <div className={"shop-items shortlist"}>
                    <h2>In negozio</h2>
                    <Link to={"/shop"}>Vedi tutti gli articoli</Link>

                    <ItemsListShort
                        products={this.props.products}
                        onAddToCart={this.props.onAddToCart}
                        removeFromCart={this.props.removeFromCart}
                    />
                </div>
            </div>
        );
    }
}
