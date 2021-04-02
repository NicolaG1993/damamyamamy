import { Component } from "react";
import { Link } from "react-router-dom";

import Login from "./Login";
import Registration from "./Registration";

export default class Access extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            displayRegistrationForm: false,
        };
        this.displayReg = this.displayReg.bind(this);
        this.displayLogin = this.displayLogin.bind(this);
    }

    async componentDidMount() {
        console.log("Access component did mount");
        console.log("this.props: ", this.props);
    }

    displayReg() {
        this.setState({
            displayRegistrationForm: true,
        });
    }

    displayLogin() {
        this.setState({
            displayRegistrationForm: false,
        });
    }

    render() {
        return (
            <div
                className={`access-overlay ${
                    this.props.accessForm ? "visible" : "hidden"
                }`}
            >
                <div className={"access"}>
                    <button
                        className={"close-access-overlay"}
                        onClick={this.props.toggleAccessForm}
                    >
                        X
                    </button>

                    <div className={"btns-container"}>
                        <button onClick={this.displayLogin}>Accedi</button>
                        <button onClick={this.displayReg}>
                            Crea un account!
                        </button>
                    </div>

                    {!this.state.displayRegistrationForm && <Login />}

                    {this.state.displayRegistrationForm && <Registration />}
                </div>
            </div>
        );
    }
}

/* 
IMPORTANTE!
🐔 Non dimenticarmi di creare codice per i vari errori in forms
guarda codice di socialnetwork di francesco

🐔 submit deve funzionare anche con invio della keyboard

🐔 toggleOverlay funziona anche se login o reg hanno errori, sbagliato!
devono solo tornare l'errore senza chiudere l'overlay in quel caso
*/

/*
MIGLIORIE:
🐔 potrei usare i css come in slider comp per eliminare quel fastidioso problema con opacity
in css - inizia da visibile quando carica la pagina
con emotion potrei risolverlo

🐔 in tutti e tre i casi (login, reg, logout) non voglio venire reindirizzato a home, ma voglio restare sulla stessa pagina

*/
