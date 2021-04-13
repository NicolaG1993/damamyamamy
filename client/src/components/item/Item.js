import React from "react";
import { Link } from "react-router-dom";

export default function Item() {
    console.log(": ");
    return <div className="item-card"></div>;
}

//questa sará la pagina specifica per ogni item nello shop
// dará tutte le infos sull'articolo
// e sará un route dinamico, no exact
// probabilmente devo passare id articolo (vedi finalproject spiced)
