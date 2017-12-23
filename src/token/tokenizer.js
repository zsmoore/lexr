import { languages } from "./languages/languageEnum.js"
import { languageNotFoundException, noCustomTokensException, duplicateTokenException } from "../exceptions/exception.js"
import { tokenize } from "../analyze/analyze.js"

class Tokenizer {

    constructor(language) {
        if (language == "") {
            this.language = "Custom";
            this.tokens = {}
        } else if (!(language in languages)) {
            throw new languageNotFoundException(language);
        } else {
            this.tokens = languages[language];
            this.language = language;
            this.strict = true;
        }
    }

    addTokenSet(tokenSet) {
        if (!(tokenSet instanceof Object)) {
           throw new TypeError("addTokenSet expects an object of token names to regex patterns"); 
        } 
    
        if (this.strict) {
            throw new noCustomTokensException(this.language);
        }          
        
        let newKeys = Object.keys(tokenSet);
        for (let key in newKeys) {
            if (key in this.tokens) {
                throw new duplicateTokenException(key);
            }
        }
        this.tokens = Object.assign(this.tokens, tokenSet);
    }

    addToken(tokenName, regPattern) {
        if (!(regPattern instanceof RegExp)) {
            throw new TypeError("Second Argument must be of type RegExp");
        }

        if (this.strict) {
            throw new noCustomTokensException(this.language);
        }

        if (tokenName in this.tokens) {
            throw new duplicateTokenException(tokenName);
        }

        this.tokens[tokenName] = regPattern;
    }

    removeToken(tokenName) {
        if (this.strict) {
            throw new noCustomTokensException(this.language);
        }

        return delete this.tokens[tokenName];
    }

    disableStrict() {
        this.strict = false;
    }

    tokenize(aString) {
        return tokenize(aString, this.tokens);
    }
}

module.exports = Tokenizer;
