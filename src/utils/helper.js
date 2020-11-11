
export const isNullOrWhiteSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
}
