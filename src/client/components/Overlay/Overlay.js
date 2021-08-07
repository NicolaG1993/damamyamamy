import { useDispatch, useSelector } from "react-redux";
import { toggleLayout } from "../../redux/ToggleLayout/toggleLayout.actions";

export default function Overlay() {
    const dispatch = useDispatch();
    let state = useSelector((state) => state);

    let status = state.toggleLayout.layouts[0].active || false;

    const close = () => {
        dispatch(toggleLayout({ id: "overlay", fn: "close" }));
    };

    return (
        <div
            className={`overlay ${status ? "overlayIn" : "overlayOut"}`}
            onClick={close}
        >
            X
        </div>
    );
}
