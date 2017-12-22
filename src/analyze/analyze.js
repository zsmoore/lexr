// Placeholder
export function tokenize(aString, tokens) {
    let tok = [];
    while (aString) {
        let maxLength = 0;
        let index = 0;
        let tokValue = "";
        let currTok = "";
        let tempArr = [];
        for (let key in tokens) {
            tempArr = aString.match(tokens[key]);
            if (tempArr !== null && tempArr['index'] <= index && tempArr[0].length > maxLength) {
                index = tempArr['index'] === undefined ? 0 : tempArr['index'];
                maxLength = tempArr[0].length;
                tokValue = tempArr[0];
                currTok = key;
            }
        }
        let before = aString.substring(0, index);
        let after = aString.substring(index + maxLength, aString.length);
        aString = before + after;
        tok.push({ token: currTok, value: tokValue});
    }
    return tok;
}
