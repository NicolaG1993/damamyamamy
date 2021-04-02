import { Component } from "react";
import axios from "/client/src/axios";
import { Link } from "react-router-dom";

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
    }

    //more code here...
    handleClick() {
        axios
            .post("/login", this.state)
            .then((resp) => {
                console.log("resp from server: ", resp);
                if (this.state.email == "" || this.state.password == "") {
                    this.setState({
                        error: true,
                    });
                } else {
                    location.replace("/"); //app?
                }
            })
            .catch((err) => {
                console.log("err in login: ", err);
                return this.setState({
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
        // console.log("this.state in Login: ", this.state);
        // console.log("props in Login: ", this.props);
        return (
            <div className={"login"}>
                {this.state.error && <p>Something broke :(</p>}

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
                    Accedi
                </button>
                <br />

                <Link to="/reset">Ho dimenticato la mia password</Link>
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
