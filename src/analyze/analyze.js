// Placeholder
export function tokenize(aString, tokenizer) {
    let tokens = tokenizer.tokens;

    let tok = [];
    while (aString) {
        let endTok = 0;
        let startTok = Number.MAX_SAFE_INTEGER;
        let tokValue = "";
        let currTok = "";
        for (let key in tokens) {
            let tempArr = aString.match(tokens[key]);
            if (tempArr !== null 
                && (tempArr['index'] < startTok
                    || (tempArr['index'] === startTok && tempArr[0].length > endTok))) {
                    startTok = tempArr['index'] === undefined ? 0 : tempArr['index'];
                    endTok = tempArr[0].length;
                    tokValue = tempArr[0];
                    currTok = key;
            }
        }
        
        // If we did not find a stem off of 0 we have an error
        // All of our held data points to the next token so substring to that token
        if (startTok !== 0) {
            tokValue = aString.substring(0, startTok);
            currTok = tokenizer.errTok;
            endTok = startTok;
        } 
        aString = aString.substring(endTok);

        if (!tokenizer.ignore[currTok]) {
            let outputObj = { token: currTok, value: tokValue};
            if (currTok in tokenizer.customOut) {
                outputObj["customOut"] = tokenizer.customOut[currTok];
            }
            tok.push(outputObj);
        }

        if (tokenizer.functions[currTok] !== undefined) {
            tokenizer.functions[currTok]();
        }
    }
    return tok;
}
