import { Component } from "react";
import axios from "/client/src/axios";
import { Link } from "react-router-dom";

import Logo from "../logo";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            first: "",
            last: "",
            email: "",
            password: "",
        };
    }

    //more code here...

    render() {
        return (
            <div className={"access-overlay"}>
                {this.state.error && <p>Something broke :(</p>}

                <Link to={"/"}>
                    <Logo />
                </Link>

                <h1>Registration</h1>
                <Link to="/login">Click here to Log in!</Link>
                <br />
                <input
                    className="auth-input"
                    onChange={(e) => this.handleChange(e)}
                    name="first"
                    type="text"
                    placeholder="first"
                />
                <br />
                <input
                    className="auth-input"
                    onChange={(e) => this.handleChange(e)}
                    name="last"
                    type="text"
                    placeholder="last"
                />
                <br />
                <input
                    className="auth-input"
                    onChange={(e) => this.handleChange(e)}
                    name="email"
                    type="text"
                    placeholder="email"
                />
                <br />
                <input
                    className="auth-input"
                    onChange={(e) => this.handleChange(e)}
                    name="password"
                    type="password"
                    placeholder="password"
                />
                <br />
                <button
                    className="auth-button"
                    onClick={() => this.handleClick()}
                >
                    Submit
                </button>
            </div>
        );
    }
}
