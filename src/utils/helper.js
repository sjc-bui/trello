
export const isNullOrWhiteSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
}

export const getLocalStorageData = (type) => {
    const localData = localStorage.getItem(type);
    const jsonObj = JSON.parse(localData);
    return jsonObj;
}

export const saveLocalStorage = (newState) => {
    localStorage.setItem('data', JSON.stringify(newState));
}

export const resetLocalData = () => {
    localStorage.removeItem('data');
}

export const defaultLanguage = () => {
    var data = getLocalStorageData('data');
    var defaultLang = "en";
    var allowLang = ["en", "ja", "vi"];

    var lang = data.language;
    var langValid = allowLang.indexOf(lang) > -1;

    if (lang.length === 2 && langValid) {
        defaultLang = lang;
    }

    return defaultLang;
}
