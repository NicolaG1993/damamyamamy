import { combineReducers } from "redux";

import shopData from "./ShopData/shopData.reducer";
import loadCart from "./LoadCart/loadCart.reducer";
import loadCheckout from "./Checkout/checkout.reducer";
import pageNav from "./PageNav/pageNav.reducer";
import toggleLayout from "./ToggleLayout/toggleLayout.reducer";
import user from "./User/user.reducer";

const rootReducer = combineReducers({
    shopData: shopData,
    loadCart: loadCart,
    checkout: loadCheckout,
    pageNav: pageNav,
    toggleLayout: toggleLayout,
    user: user,
});

export default rootReducer;
