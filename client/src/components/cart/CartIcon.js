import React from "react";
import { Link } from "react-router-dom";

export default function CartIcon({ cart, closeNav }) {
    // console.log("props in CartIcon.js: ", props);

    return (
        <div className={"cart-icon-box"}>
            <Link to={"/cart"} onClick={closeNav}>
                <div className={"cart-icon"}>
                    <svg
                        id="Livello_1"
                        data-name="Livello 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 128 122.04"
                    >
                        <path
                            d="M862,447v-5c3.51-3.75,8.11-3,12.51-3,13,0,16.86,3.1,18.29,15.71.46,4.11,1.94,5.14,5.88,5.12,27.47-.16,54.94,0,82.41-.13,3.48,0,6.57.49,8.91,3.29v5c-3.78,14-5.87,28.27-8.89,42.38-2.3,10.77-7.68,15.46-18.61,15.48-17.64,0-35.28,0-52.91,0-13.69,0-18.73-4.64-20.61-18.26-2.39-17.29-5.28-34.51-7.46-51.82-.6-4.81-2.67-5.57-6.74-5.44C870.28,450.49,865.33,451.6,862,447Z"
                            transform="translate(-862 -438.95)"
                        />
                        <path
                            d="M973.94,546.16a14.94,14.94,0,1,1-14.89-15.07A15.39,15.39,0,0,1,973.94,546.16Z"
                            transform="translate(-862 -438.95)"
                        />
                        <path
                            d="M922.24,546.08c0,8-6.67,14.79-14.46,14.79s-14.51-6.76-14.64-14.69S900.24,531,908,531.12A14.8,14.8,0,0,1,922.24,546.08Z"
                            transform="translate(-862 -438.95)"
                        />
                    </svg>
                </div>

                {cart && <div id="cartCounter">{cart.total_items}</div>}
            </Link>
        </div>
    );
}
