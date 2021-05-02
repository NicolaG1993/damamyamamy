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

    componentDidMount() {
        // console.log("Home component did mount");
        // console.log("this.props: ", this.props);
        window.scrollTo(0, 0);
    }

    render() {
        // console.log("this.state in home: ", this.state);

        return (
            <div id="home">
                <Slider slides={images} autoPlay={4} />

                <div className={"shortlist"}>
                    <h2>IN NEGOZIO</h2>
                    <Link to={"/shop"} className={"fake-btn inverted-btn"}>
                        Vedi tutti gli articoli
                    </Link>

                    <ItemsListShort
                        products={this.props.products}
                        notAvailables={this.props.notAvailables}
                        onAddToCart={this.props.onAddToCart}
                        removeFromCart={this.props.removeFromCart}
                        listTitle={"Ultimi arrivi"}
                    />

                    <ItemsListShort
                        products={this.props.products}
                        notAvailables={this.props.notAvailables}
                        onAddToCart={this.props.onAddToCart}
                        removeFromCart={this.props.removeFromCart}
                        listTitle={"Abbigliamento"}
                    />

                    <ItemsListShort
                        products={this.props.products}
                        notAvailables={this.props.notAvailables}
                        onAddToCart={this.props.onAddToCart}
                        removeFromCart={this.props.removeFromCart}
                        listTitle={"Neonati"}
                    />
                </div>
            </div>
        );
    }
}
