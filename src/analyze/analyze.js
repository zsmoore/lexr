export function tokenize(aString, tokenizer) {
    let tokens = tokenizer.tokens;
    let tok = [];

    while (aString) {    
        let { endTok, startTok, tokValue, currTok } = getNearestTok(tokens, aString);

        // If we did not find a stem off of 0 we have an error
        // All of our held data points to the next token so substring to that token
        if (startTok !== 0) {
            tokValue = aString.substring(0, startTok);
            currTok = tokenizer.errTok;
            endTok = startTok;
        } 

        // Either push to output or ignore
        if (!tokenizer.ignore[currTok]) {
            tok.push(formatOutput(currTok, tokValue, tokenizer));
        }

        // Call function if assigned one
        if (currTok in tokenizer.functions) {
            tokenizer.functions[currTok]();
        }
        aString = aString.substring(endTok);
    }
    return tok;
}

function formatOutput(currTok, tokValue, tokenizer) {
    let output = {token: currTok, value: tokValue};
    if (currTok in tokenizer.customOut) {
        output['customOut'] = tokenizer.customOut[currTok];
    }
    return output;
}

function getNearestTok(tokens, aString) {
    let endTok = 0;
    let startTok = Number.MAX_SAFE_INTEGER;
    let tokValue, currTok = "";
    
    for (let key in tokens) {                    
        let tempArr = aString.match(tokens[key]);        
        if (tempArr !== null 
            && (tempArr['index'] < startTok
            || (tempArr['index'] === startTok && tempArr[0].length > endTok))) {
                startTok = tempArr['index'];
                endTok = tempArr[0].length;
                tokValue = tempArr[0];
                currTok = key;
        }
    }    
    return { 'endTok': endTok, 'startTok': startTok, 'tokValue': tokValue, 'currTok': currTok };
}
