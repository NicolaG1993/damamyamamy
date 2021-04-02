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
forse mi conviene fare un class component? credo
poi con bind creare un toggle/switch fn
che viene attivata dai due tasti (login/reg)
e mostra il relativo form
*/

/*
AGGIORNAMENTO:
ora passo la funzione toggleForms e la utilizzo con i pulsanti dentro login o reg components
invece potrei renderizzarli in questo component (i due btn intendo)
e passargli lo stile (clicked ad es.) quando displayRegistrationForm é true o false
stessa cosa per btn X

----
ora peró ogni tasto funziona come toggle e non va bene
devono portare al component corrispondente
*/

/* 
IMPORTANTE!
Non dimenticarmi di creare codice per i vari errori in forms
guarda codice di socialnetwork di francesco

submit deve funzionare anche con invio della keyboard
*/

/*
MIGLIORIE:
potrei usare i css come in slider comp per eliminare quel fastidioso problema con opacity
in css - inizia da visibile quando carica la pagina
con emotion potrei risolverlo
 */
