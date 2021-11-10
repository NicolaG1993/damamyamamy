import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/LoadCart/loadCart.actions";
import { commerce } from "../libs/commerce";

export default function checkAvailability(
    checkoutTokenId,
    lineItemId,
    requestedQuantity
) {
    commerce.checkout
        .checkQuantity(checkoutTokenId, lineItemId, {
            amount: requestedQuantity,
        })
        .then((response) => {
            console.log("checkAvailability", response.available);

            if (response.available === false) {
                const dispatch = useDispatch();
                dispatch(removeFromCart({ productId: item.id }));
            }
        });
}

//questa fn deve essere applicata su ogni oggetto desiderato presente in cart
//se la risposta é false allora si elimina quel prodotto dal carrello, subito prima di avviare il checkout
//sarebbe ideale un allert che dica quali prodotti sono stati rimossi
//inoltre usare questa fn anche quando si va su cart

//HO CREATO REDUX ACTION PER QUESTO, eliminare questo file

//serve una nuova fn per store
// che ad ogni refresh/render di App controlli se ci sono prodotti con disponibilitá false o 0
// questi verranno rimossi da store state
//mi chiedo se esiste una req per avere solo quelli con disponibilitá >0
