import { combineReducers } from "redux";

import loadData from "./LoadData/loadData.reducer";
import loadCart from "./LoadCart/loadCart.reducer";
import filterStore from "./FilterStore/filterStore.reducer";
import pageNav from "./PageNav/pageNav.reducer";
import toggleLayout from "./ToggleLayout/toggleLayout.reducer";

const rootReducer = combineReducers({
    loadData: loadData,
    filterStore: filterStore,
    loadCart: loadCart,
    pageNav: pageNav,
    toggleLayout: toggleLayout,
});

export default rootReducer;
