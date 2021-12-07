function setTheme(themeName) {
    localStorage.setItem("theme", themeName);
    document.documentElement.className = themeName;
}

function keepTheme() {
    if (localStorage.getItem("theme")) {
        if (localStorage.getItem("theme") === "theme-dark") {
            setTheme("theme-dark");
        } else if (localStorage.getItem("theme") === "theme-light") {
            setTheme("theme-light");
        }
    } else {
        setTheme("theme-dark");
    }
}

module.exports = {
    setTheme,
    keepTheme,
};

//uso localStorage perché theme serve solo su client, e non ha scadenza
//cookies servono per data usato in server, ed hanno una scadenza
