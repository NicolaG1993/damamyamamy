import { Link } from "react-router-dom";

export default function Logout(props) {
    console.log("props in Logout.js: ", props);

    return <button>Logout</button>;
}

/*
Vorrei creare un logout che non faccia redirect to "/"
non so se va bene per via di cache and coockies magari?
dovrei informarmi su quale sia il metodo effettivamente migliore
*/
