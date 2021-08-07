/* eslint-disable indent */
import { TOGGLE, OPEN, CLOSE } from "./toggleLayout.types";

const INITIAL_STATE = {
    layouts: [
        { id: "overlay", active: false },
        { id: "nav", active: false },
        { id: "alert", active: true },
    ],
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

        default:
            return state;
    }
}
