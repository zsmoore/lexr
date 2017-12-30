function formatOutput(currTok, tokValue, tokenizer) {
    const output = {token: currTok, value: tokValue};
    if (currTok in tokenizer.customOut) {
        output.customOut = tokenizer.customOut[currTok];
    }
    return output;
}

function updateValues(tempArr, values, key) {
    if (tempArr !== null && (tempArr.index < values.startTok
            || tempArr.index === values.startTok && tempArr[0].length > values.endTok)) {
        values.startTok = tempArr.index;
        values.tokValue = tempArr[0];
        values.endTok = tempArr[0].length;
        values.currTok = key;
    }
    return values;
}

function getNearestTok(tokens, aString) {
    let values = {
        endTok  : 0,
        startTok: Number.MAX_SAFE_INTEGER,
        tokValue: '',
        currTok : '',
    };

    for (const key in tokens) {
        const tempArr = aString.match(tokens[key]);
        values = updateValues(tempArr, values, key);
    }
    return values;
}

export function tokenize(aString, tokenizer) {
    const tokens = tokenizer.tokens;
    const tok = [];

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
