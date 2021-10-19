/* eslint-disable indent */
import { TOGGLE, OPEN, CLOSE, SET_COLOR } from "./toggleLayout.types";

const INITIAL_STATE = {
    layouts: [
        { id: "overlay", active: false },
        { id: "nav", active: false },
        { id: "alert", active: true },
    ],
    theme: "theme-light",
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case TOGGLE: {
            let { layouts } = state;
            // console.log("TOGGLE: ", action.payload);
            let id = action.payload.id;

            let newArr = layouts.map((layout) =>
                layout.id === id
                    ? { id: layout.id, active: !layout.active }
                    : layout
            );
            return { layouts: newArr };
        }

        case OPEN: {
            let { layouts } = state;
            // console.log("OPEN: ", action.payload);
            let id = action.payload.id;

            let newArr = layouts.map((layout) =>
                layout.id === id ? { id: layout.id, active: true } : layout
            );
            return { layouts: newArr };
        }

        case CLOSE: {
            let { layouts } = state;
            // console.log("CLOSE: ", action.payload);
            let id = action.payload.id;

            let newArr = layouts.map((layout) =>
                layout.id === id ? { id: layout.id, active: false } : layout
            );
            return { layouts: newArr };
        }

        case SET_COLOR: {
            let color = action.payload.color;
            console.log("SET_COLOR: ", action.payload);

            return {
                ...state,
                theme: color,
            };
        }

        default:
            return state;
    }
}
