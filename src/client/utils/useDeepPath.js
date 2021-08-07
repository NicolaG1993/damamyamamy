export default function useDeepPath(obj, path, def) {
    //questa funzione serve per passare deep path come stringhe, es: "price.raw"
    function stringToPath(path) {
        // If the path isn't a string, return it
        if (typeof path !== "string") return path;

        // Create new array
        var output = [];

        // Split to an array with dot notation
        path.split(".").forEach(function (item, index) {
            // Split to an array with bracket notation
            item.split(/\[([^}]+)\]/g).forEach(function (key) {
                // Push to the new array
                if (key.length > 0) {
                    output.push(key);
                }
            });
        });

        return output;
    }

    // Get the path as an array
    path = stringToPath(path);

    // Cache the current object
    var current = obj;

    // For each item in the path, dig into the object
    for (var i = 0; i < path.length; i++) {
        // If the item isn't found, return the default (or null)
        if (!current[path[i]]) return def || null;

        // Otherwise, update the current  value
        current = current[path[i]];
    }

    return current;
}

// useDeepPath(state, price.raw, "no results");
// penso si usi cosí (vedi useSort.js)
