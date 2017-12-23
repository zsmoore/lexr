import { languages } from "./languages/languageEnum.js"
import { languageNotFoundException, noCustomTokensException, duplicateTokenException, noSuchTokenException } from "../exceptions/exception.js"
import { tokenize } from "../analyze/analyze.js"

class Tokenizer {

    constructor(language) {
        this.ignore = {};        
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

    addIgnore(tokenName) {
        if (!(tokenName in this.tokens)) {
            throw new noSuchTokenException(tokenName);
        }

        this.ignore[tokenName] = true;
    }

    addIgnoreSet(tokens) {
        if (!(tokens instanceof Array) && !(tokens instanceof Object)) {
            throw new TypeError("addIgnoreSet expects either an array of tokens or object of tokens to ignore or not");
        }

        if (tokens instanceof Array) {
            for (let i = 0; i < tokens.length; i++) {
                if (!(tokens[i] in this.tokens)) {
                    throw new noSuchTokenException(tokens[i]);
                }
                this.ignore[tokens[i]] = true;
            }
        } else if (tokens instanceof Object) {
            for (let key in tokens) {
                if (!(key in this.tokens)) {
                    throw new noSuchTokenException(key);
                }

                if (tokens[key] !== true && tokens[key] !== false) {
                    throw new TypeError("When using an object for ignoring the value must be a boolean");
                }                
                this.ignore[key] = tokens[key];
            }
        }
    }

    unIgnore(tokenName) {
        if (!(tokenName in this.tokens)) {
            throw new noSuchTokenException(tokenName);
        }
        this.ignore[tokenName] = false;
    }

    disableStrict() {
        this.strict = false;
    }

    tokenize(aString) {
        return tokenize(aString, this);
    }
}

module.exports = Tokenizer;
