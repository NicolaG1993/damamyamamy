import axios from "/client/src/axios";
import { Component } from "react";
import { Link } from "react-router-dom";

import Slider from "../slider/Slider";
import images from "../slider/img/images";
import ItemsListShort from "../items-list-short/ItemsListShort";
import PostsListShort from "../posts-list-short/PostsListShort";

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
                <h1>Da Mamy a Mamy App</h1>
                <Slider slides={images} />

                <div className={"shop-items shortlist"}>
                    <h2>Articoli in negozio</h2>
                    <ItemsListShort />
                </div>

                <div className={"users-items shortlist"}>
                    <h2>Articoli della community</h2>
                    <ItemsListShort />
                </div>

                <div className={"users-posts shortlist"}>
                    <h2>Posts recenti</h2>
                    <PostsListShort />
                </div>
            </div>
        );
    }
}
