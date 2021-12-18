function formatJSDate(date) {
    let dt = new Date(date);
    return (
        dt.getMonth() +
        1 +
        "/" +
        dt.getDate() +
        "/" +
        dt.getYear() +
        " " +
        dt.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
        })
    );
}

function formatDateShort(date) {
    return date.toString().split("T")[0];
}

export { formatJSDate, formatDateShort };
