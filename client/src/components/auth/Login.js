import { Component } from "react";
import axios from "/client/src/axios";
import { Link } from "react-router-dom";

import Logo from "../logo";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            email: "",
            password: "",
        };
    }

    async componentDidMount() {
        console.log("Login component did mount");
        console.log("this.state in Login: ", this.state);
        console.log("props in Login: ", this.props);
        this.setState({
            accessFormIsActive: this.props.accessForm,
        });
    }

    //more code here...

    render() {
        return (
            <div className={"access-overlay"}>
                {this.state.error && <p>Something broke :(</p>}

                <Link to={"/"}>
                    <Logo />
                </Link>

                <h1>Login</h1>

                <input
                    className="auth-input"
                    onChange={(e) => this.handleChange(e)}
                    name="email"
                    type="text"
                    placeholder="adobo0@example.com"
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
                    Login
                </button>
                <br />
                <Link to="/registration">Create an account!</Link>

                <br />
                <Link to="/reset">Click here if you forgot your password!</Link>
            </div>
        );
    }
}

/*
NON FUNZIONA
il toggle in App funziona ma non si aggiorna lo state in Login
é come se non ricevesse aggiornamenti da app, ma se checko le props in render funzionano, ma senza aggiornare lo state
come mai non si aggiorna?
*/
