/* eslint-disable indent */
import { sortArrayDesc } from "../../utils/useSort";
import {
    LOAD_DATA,
    FETCH_CATEGORIES,
    FETCH_SPECIFIC_CATEGORIES,
    FETCH_HIGHEST_VALUE,
    GET_ITEM,
} from "./loadData.types";

const INITIAL_STATE = {
    data: [],
    categories: [],
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOAD_DATA: {
            let data = action.payload;
            // console.log("LOAD_DATA: ", action.payload);

            return {
                ...state,
                data,
            };
        }

        case FETCH_CATEGORIES: {
            // console.log("FETCH_CATEGORIES: ", action.payload);
            let categories = action.payload;

            return {
                ...state,
                categories,
            };
        }

        case FETCH_SPECIFIC_CATEGORIES: {
            let { data } = state;

            let catNewItems = data && sortArrayDesc(data, "created");
            let cat1 =
                data &&
                data.filter(
                    (product) =>
                        product.categories[0] &&
                        product.categories[0].slug === "giochi"
                );
            let cat2 =
                data &&
                data.filter(
                    (product) =>
                        product.categories[0] &&
                        product.categories[0].slug === "passeggini-e-trasporto"
                ); // FIXARE? 🧨

            // console.log("FETCH_SPECIFIC_CATEGORIES: ", {
            //     ...state,
            //     catNewItems,
            //     cat1,
            //     cat2,
            // });
            return {
                ...state,
                catNewItems,
                cat1,
                cat2,
            };
        }

        case GET_ITEM: {
            let selectedItem = action.payload;
            // let key = Number(action.payload.key);
            // let selectedItem = data.find((item) => item.id === key); // FIXARE ? 🧨
            // console.log("GET_ITEM: ", action);
            return {
                ...state,
                selectedItem,
            };
        }

        case FETCH_HIGHEST_VALUE: {
            let { data } = state;
            // console.log("FETCH_HIGHEST_VALUE data: ", data);
            let topValue;
            data
                ? (topValue = Math.max.apply(
                      Math,
                      data.map(function (element) {
                          return element.price.raw; // FIXARE ? 🧨
                      })
                  ))
                : (topValue = 10);

            // console.log("FETCH_HIGHEST_VALUE topValue: ", topValue);

            return {
                ...state,
                topValue,
            };
        }

        default:
            return state;
    }
}
