import { tokens } from "../token/tokenEnum.js"

// Placeholder
export function parse(aString) {
    let tok = [];
    let cop = aString.substring(0);
    aString = aString.replace(/(\u000A|\u000D(?!\u000A)|\u2028|\u2029|\u000D\u000A)/g, "");
    while (aString) {
        let maxLength = 0;
        let index = 0;
        let currTok = "";
        let tempArr = [];
        for (let key in tokens) {
            tempArr = aString.match(tokens[key]);
            if (tempArr !== null && tempArr['index'] <= index && tempArr[0].length > maxLength) {
                index = tempArr['index'] === undefined ? 0 : tempArr['index'];
                maxLength = tempArr[0].length;
                currTok = key;
            }
        }
        let before = aString.substring(0, index);
        let after = aString.substring(index + maxLength, aString.length);
        aString = before + after;
        if (tokens[currTok] !== tokens.WHITESPACE) tok.push(currTok);
    }
    console.log(cop);
    console.log(tok);
}
