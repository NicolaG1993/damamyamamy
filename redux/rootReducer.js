import { combineReducers } from "redux";

import shopData from "./ShopData/shopData.reducer";
import cart from "./Cart/cart.reducer";
import checkout from "./Checkout/checkout.reducer";
import pageNav from "./PageNav/pageNav.reducer";
import toggleLayout from "./ToggleLayout/toggleLayout.reducer";
import user from "./User/user.reducer";
import admin from "./AdminDashboard/admin.reducer";

const rootReducer = combineReducers({
    shopData: shopData,
    cart: cart,
    checkout: checkout,
    pageNav: pageNav,
    toggleLayout: toggleLayout,
    user: user,
    admin: admin,
});

export default rootReducer;
