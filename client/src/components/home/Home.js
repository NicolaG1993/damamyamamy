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
            style: {
                iconslistHeight: `800px`,
                shortlistPadding: `100px 40px 90px 40px`,
            },
        };

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        // console.log("Home component did mount");
        // console.log("this.props: ", this.props);
        window.scrollTo(0, 0);
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    async handleScroll(e) {
        // console.log("e", e);
        let scrollTop = window.scrollY;
        let windowWidth = this.props.windowWidth;
        console.log("scrollTop: ", scrollTop);
        console.log("windowWidth: ", windowWidth);

        if (scrollTop > 1380) {
            if (windowWidth <= 720) {
                this.setState({
                    style: {
                        iconslistHeight: `1000px`,
                        shortlistPadding: `100px 20px 120px 20px`,
                    },
                });
            } else {
                this.setState({
                    style: {
                        iconslistHeight: `400px`,
                        shortlistPadding: `100px 40px 90px 40px`,
                    },
                });
            }
        } else {
            if (windowWidth <= 720) {
                this.setState({
                    style: {
                        iconslistHeight: `800px`,
                        shortlistPadding: `100px 20px 120px 20px`,
                    },
                });
            } else {
                this.setState({
                    style: {
                        iconslistHeight: `800px`,
                        shortlistPadding: `100px 40px 300px 40px`,
                    },
                });
            }
        }
    }

    render() {
        // console.log("this.state in home: ", this.state);
        // console.log("this.props: ", this.props);

        return (
            <div id="home">
                <Slider slides={images} autoPlay={10} />

                <div
                    className={"shortlist"}
                    style={{ padding: this.state.style.shortlistPadding }}
                >
                    <h2>IN NEGOZIO</h2>
                    <Link to={"/shop"} className={"fake-btn btn-dark2"}>
                        Vedi tutti gli articoli
                    </Link>

                    <ItemsListShort
                        products={this.props.products}
                        notAvailables={this.props.notAvailables}
                        onAddToCart={this.props.onAddToCart}
                        removeFromCart={this.props.removeFromCart}
                        listTitle={"Ultimi arrivi"}
                        windowWidth={this.props.windowWidth}
                    />

                    <ItemsListShort
                        products={this.props.cat1}
                        notAvailables={this.props.notAvailables}
                        onAddToCart={this.props.onAddToCart}
                        removeFromCart={this.props.removeFromCart}
                        listTitle={"Abbigliamento"}
                        windowWidth={this.props.windowWidth}
                    />

                    <ItemsListShort
                        products={this.props.cat2}
                        notAvailables={this.props.notAvailables}
                        onAddToCart={this.props.onAddToCart}
                        removeFromCart={this.props.removeFromCart}
                        listTitle={"Neonati"}
                        windowWidth={this.props.windowWidth}
                    />
                </div>

                <div
                    className="iconslist"
                    style={{ height: this.state.style.iconslistHeight }}
                >
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
                            <p>
                                In caso di prodotti rovinati é previsto il
                                rimborso
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
