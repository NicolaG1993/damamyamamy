import { Component } from "react";
import axios from "/client/src/axios";
import { Link } from "react-router-dom";

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

    handleClick() {
        axios
            .post("/registration", this.state)
            .then((resp) => {
                console.log("resp from server: ", resp);
                if (
                    this.state.first == "" ||
                    this.state.last == "" ||
                    this.state.email == "" ||
                    this.state.password == ""
                ) {
                    this.setState({
                        error: true,
                    });
                } else {
                    location.replace("/"); //app?
                }
            })
            .catch((err) => {
                console.log("err in registration: ", err);
                this.setState({
                    error: true,
                });
                // render an error message
            });
    }

    handleChange(e) {
        console.log("e target name: ", e.target.name);
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state after setState: ", this.state)
        );
    }

    render() {
        return (
            <div className={"registration"}>
                {this.state.error && <p>Something broke :(</p>}

                <h1>Registrazione</h1>

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
                    Registrati
                </button>
            </div>
        );
    }
}
