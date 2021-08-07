import useDeepPath from "./useDeepPath";

export function sortArrayAsc(arr, field) {
    let sortedArr = arr.sort(function (a, b) {
        if (useDeepPath(a, field) > useDeepPath(b, field)) {
            return 1;
        }
        if (useDeepPath(b, field) > useDeepPath(a, field)) {
            return -1;
        }
        return 0;
    });
    return JSON.parse(JSON.stringify(sortedArr)); //l'array qui viene clonata, se no redux non la re-rendera
}

export function sortArrayDesc(arr, field) {
    let sortedArr = arr.sort(function (a, b) {
        if (useDeepPath(a, field) > useDeepPath(b, field)) {
            return -1;
        }
        if (useDeepPath(b, field) > useDeepPath(a, field)) {
            return 1;
        }
        return 0;
    });
    return JSON.parse(JSON.stringify(sortedArr));
}
