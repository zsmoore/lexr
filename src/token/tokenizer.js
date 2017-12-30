import { languages } from "./languages/languageEnum.js";
import { languageNotFoundException, noCustomTokensException, duplicateTokenException, noSuchTokenException, errorTokenCollisionException } from "../exceptions/exception.js";
import { tokenize } from "../analyze/analyze.js";

class Tokenizer {

    constructor(language) {
        this.ignore = {};
        this.customOut = {};
        this.functions = {};
        this.errTok = "ERROR";
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
        
        for (let key in tokenSet) {
            if (key in this.tokens) {
                throw new duplicateTokenException(key);
            }
            
            if (!(tokenSet[key] instanceof RegExp)) {
                throw new TypeError('value of key should be regexp in tokenset');
            }
            this.tokens[key] = tokenSet[key];
        }
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

    addCustomOutSet(customOutSet) {
        if (!(customOutSet instanceof Object)) {
            throw new TypeError("addOverrideSet expects an object of tokens to output");
        }
        for (let key in customOutSet) {
            if (!(key in this.tokens)) {
                throw new noSuchTokenException(key);
            }
            this.customOut[key] = customOutSet[key];
        }
    }

    addCustomOut(tokenName, output) {
        if (!(tokenName in this.tokens)) {
            throw new noSuchTokenException(tokenName);
        }

        this.customOut[tokenName] = output;
    }

    removeCustomOut(tokenName) {
        if (!(tokenName in this.tokens)) {
            throw new noSuchTokenException(tokenName);
        }

        return delete this.customOut[tokenName];
    }

    addFunctionSet(functionSet) {
        if (!(functionSet instanceof Object)) {
            throw new TypeError("addFunctionSet expects an object of tokens to functions");
        }
        for (let key in functionSet) {
            if (!(key in this.tokens)) {
                throw new noSuchTokenException(key);
            }

            if (!(functionSet[key] instanceof Function)) {
                throw new TypeError('functionSet value of key must be a function');
            }
            this.functions[key] = functionSet[key];
        }
    }

    addFunction(tokenName, func) {
        if (!(func instanceof Function)) {
            throw new TypeError("addFunction expects a function as the second argument");
        }

        if (!(tokenName in this.tokens)) {
            throw new noSuchTokenException(tokenName);
        }

        this.functions[tokenName] = func;
    }

    removeFunction(tokenName) {
        if (!(tokenName in this.tokens)) {
            throw new noSuchTokenException(tokenName);
        }

        return delete this.functions[tokenName];
    }

    setErrTok(errTok) {
        if (errTok in this.tokens) {
            throw new errorTokenCollisionException(errTok);
        }
        this.errTok = errTok;
    }

    disableStrict() {
        this.strict = false;
    }

    tokenize(aString) {
        if (this.errTok in this.tokens) {
            throw new errorTokenCollisionException(this.errTok);
        }
        return tokenize(aString, this);
    }
}

module.exports = Tokenizer;
