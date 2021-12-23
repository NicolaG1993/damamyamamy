function createObjectURL(object) {
    return window.URL
        ? window.URL.createObjectURL(object)
        : window.webkitURL.createObjectURL(object);
}

function revokeObjectURL(url) {
    return window.URL
        ? window.URL.revokeObjectURL(url)
        : window.webkitURL.revokeObjectURL(url);
}

module.exports = {
    createObjectURL,
    revokeObjectURL,
};
