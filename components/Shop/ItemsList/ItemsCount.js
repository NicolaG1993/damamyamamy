import { useSelector, shallowEqual } from "react-redux";
const loadShopData = (state) => state.shopData.filteredItems;

export default function ItemsCount() {
    let storeState = useSelector(loadShopData, shallowEqual);

    return (
        <>
            {storeState.length === 1 && <h5>{storeState.length} risultato</h5>}
            {storeState.length > 1 && <h5>{storeState.length} risultati</h5>}
        </>
    );
}
