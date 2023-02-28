const deleteDuplicateObjects = (arr) => {
    return arr.filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i);
};
const deleteDuplicateValues = (arr) => {
    return [...new Set(arr)];
};

export { deleteDuplicateObjects, deleteDuplicateValues };
