const parseFormRelationsEdit = (relatedData, propsData) => {
    // !important that we need ids and not names for db update
    let addedRelations = {};
    let removedRelations = {};

    if (relatedData) {
        Object.entries(relatedData).map(([key, arr], i) => {
            let standardMethod = (arr, propsData, key) => {
                return arr
                    .filter(
                        (x) =>
                            !propsData[key]
                                .filter((el) => el.name) // skip any corrupted element saved before in db
                                .map((el) => el.name) // modify the rest
                                .includes(x.name) // check if includes the user selected x
                    )
                    .map((el) => el.id); // get only the ids
            };

            // set the new relations
            addedRelations[key] = standardMethod(arr, propsData, key);
            // set the deleted relations
            removedRelations[key] = propsData[key]
                .filter((el) => !arr.map((el) => el.id).includes(el.id))
                .map((el) => el.id);
        });
    }

    return {
        addedRelations,
        removedRelations,
    };
};

export { parseFormRelationsEdit };
