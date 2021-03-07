import axios from "./axios";
import { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class App extends Component {
    async componentDidMount() {
        console.log("App component did mount");
    }

    render() {
        return (
            <div className={"App"}>
                <h1>Hello im App!</h1>
            </div>
        );
    }
}
