/* eslint-disable indent */
import { SETUP, LOAD_NEW_PAGE, LOAD_EXACT_PAGE } from "./pageNav.types";

const INITIAL_STATE = { countPerPage: 9 }; // countPerPage: We need the total number of pages. This is used in rendering the pagination component. //round up

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SETUP: {
            console.log("🍄SETUP: ", action.payload);
            let data = action.payload.ItemsList;
            let { countPerPage } = state;
            let count = data.length + 1;
            let totalPages = Math.ceil((count - 1) / countPerPage);
            return {
                ...state,
                filteredItems: data, //i prodotti dopo i filtri // tutti inizialmente
                displayedItems: data.slice(0, countPerPage), //i prodotti al momento in pagina //0 l'inizio, countPerPage la fine
                currentCount: countPerPage, //index di filteredItems da usare per displayedItems //lo starting point
                totalCount: count, //la lunghezza di filteredItems
                currentPage: 1, //la pagina attuale
                totalPages: totalPages, //pagine totali
                filteredPages: totalPages, //totale pagine filtrate ?
            };
        }

        case LOAD_NEW_PAGE: {
            let { countPerPage } = state;
            let newState = Object.assign({}, state);
            let addPages = action.payload.page; //page to add (always 1 or -1)
            newState.currentPage += addPages; //add it to the currentPage
            let nextProducts;

            if (addPages === 1) {
                let upperCount = newState.currentCount + countPerPage; //Moving from page 1 to 2 will cause ‘upperCount’ to be 18
                let lowerCount = newState.currentCount; //This hasn’t been changed
                newState.currentCount += countPerPage; //Set new currentCount
                //Only retrieve products within the (9,18) range (for page 2)
                nextProducts = state.filteredItems.slice(
                    lowerCount,
                    upperCount
                );
            }
            if (addPages === -1) {
                let upperCount = newState.currentCount; //18 //’currentCount’ has changed roles. Now it serves as the upperCount.
                let lowerCount = newState.currentCount - countPerPage; //9
                newState.currentCount = lowerCount; //Then it’s reset. This way, the first if statement will always treat it as the ‘upperCount’
                nextProducts = state.filteredItems.slice(
                    lowerCount - countPerPage,
                    upperCount - countPerPage
                );
            }

            newState.displayedItems = nextProducts;
            window.history.pushState(
                { page: 1 },
                "title 1",
                `?page=${newState.currentPage}`
            ); //set url bar to actual page
            return newState;
        }

        case LOAD_EXACT_PAGE: {
            // console.log("LOAD_EXACT_PAGE", state);
            const newState = Object.assign({}, state);
            const exactPage = action.payload.page;
            let upperCountExact = newState.countPerPage * exactPage;
            let lowerCountExact = upperCountExact - newState.countPerPage;

            let exactProducts = newState.filteredItems.slice(
                lowerCountExact,
                upperCountExact
            );

            newState.displayedItems = exactProducts;
            newState.currentCount = upperCountExact;
            newState.currentPage = exactPage;
            window.history.pushState(
                { page: 1 },
                "title 1",
                `?page=${newState.currentPage}`
            );

            return newState;
        }

        default:
            return state;
    }
}

// una fn per fare il load di data necessario e settare starting state values (magari gia in shop o app!)
//   fare lo stesso per passState allora? (metterlo in app intendo)
//   e allora potrei anche accedere a results di Shop direttamente dallo state in ItemsList ?
//   e Shop diventerebbe un semplice container ? nice

//   pensandoci non mi serve tutto data in App, ma solo in Shop
//      in App data alla fine mi serve solo per le small categories, potrei peró caricarlo dentro il reducer per Shop -> filterStore
//      che poi passo ad un altro reducer per settare le small categories in un altro state (che useró in Home)

// una fn load new page
