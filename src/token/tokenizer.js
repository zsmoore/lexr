import { DuplicateTokenException,
    ErrorTokenCollisionException,
    LanguageNotFoundException,
    NoCustomTokensException,
    NoSuchTokenException } from '../exceptions/exception.js';
import { languages } from './languages/languageEnum.js';
import { tokenize } from '../analyze/analyze.js';

function checkNoSuchToken(tokenName, tokenSet) {
    if (!(tokenName in tokenSet)) { throw new NoSuchTokenException(tokenName); }
}

function checkErrorTokCollision(errTok, tokenSet) {
    if (errTok in tokenSet) { throw new ErrorTokenCollisionException(errTok); }
}

class Tokenizer {

    constructor(language) {
        this.ignore = {};
        this.customOut = {};
        this.functions = {};
        this.errTok = 'ERROR';
        if (language === '') {
            this.language = 'Custom';
            this.tokens = {};
        } else if (!(language in languages)) {
            throw new LanguageNotFoundException(language);
        } else {
            this.tokens = languages[language];
            this.language = language;
            this.strict = true;
        }
    }

    addTokenSet(tokenSet) {
        if (!(tokenSet instanceof Object)) {
            throw new TypeError('addTokenSet expects an object of token names to regex patterns');
        }

        if (this.strict) {
            throw new NoCustomTokensException(this.language);
        }

        for (const key in tokenSet) {
            if (key in this.tokens) {
                throw new DuplicateTokenException(key);
            }

            if (!(tokenSet[key] instanceof RegExp)) {
                throw new TypeError('value of key should be regexp in tokenset');
            }
            this.tokens[key] = tokenSet[key];
        }
    }

    addToken(tokenName, regPattern) {
        if (!(regPattern instanceof RegExp)) {
            throw new TypeError('Second Argument must be of type RegExp');
        }

        if (this.strict) {
            throw new NoCustomTokensException(this.language);
        }

        if (tokenName in this.tokens) {
            throw new DuplicateTokenException(tokenName);
        }

        this.tokens[tokenName] = regPattern;
    }

    removeToken(tokenName) {
        if (this.strict) {
            throw new NoCustomTokensException(this.language);
        }

        return delete this.tokens[tokenName];
    }

    addIgnore(tokenName) {
        checkNoSuchToken(tokenName, this.tokens);
        this.ignore[tokenName] = true;
    }

    addIgnoreSet(tokens) {
        if (!(tokens instanceof Array) && !(tokens instanceof Object)) {
            throw new TypeError('addIgnoreSet expects either an array of tokens or object of tokens to ignore or not');
        }

        if (tokens instanceof Array) {
            for (let i = 0; i < tokens.length; i++) {
                checkNoSuchToken(tokens[i], this.tokens);
                this.ignore[tokens[i]] = true;
            }
        } else {
            for (const key in tokens) {
                checkNoSuchToken(key, this.tokens);
                if (tokens[key] !== true && tokens[key] !== false) {
                    throw new TypeError('When using an object for ignoring the value must be a boolean');
                }
                this.ignore[key] = tokens[key];
            }
        }
    }

    unIgnore(tokenName) {
        checkNoSuchToken(tokenName, this.tokens);
        this.ignore[tokenName] = false;
    }

    addCustomOutSet(customOutSet) {
        if (!(customOutSet instanceof Object)) {
            throw new TypeError('addOverrideSet expects an object of tokens to output');
        }
        for (const key in customOutSet) {
            checkNoSuchToken(key, this.tokens);
            this.customOut[key] = customOutSet[key];
        }
    }

    addCustomOut(tokenName, output) {
        checkNoSuchToken(tokenName, this.tokens);
        this.customOut[tokenName] = output;
    }

    removeCustomOut(tokenName) {
        checkNoSuchToken(tokenName, this.tokens);
        return delete this.customOut[tokenName];
    }

    addFunctionSet(functionSet) {
        if (!(functionSet instanceof Object)) {
            throw new TypeError('addFunctionSet expects an object of tokens to functions');
        }
        for (const key in functionSet) {
            checkNoSuchToken(key, this.tokens);

            if (!(functionSet[key] instanceof Function)) {
                throw new TypeError('functionSet value of key must be a function');
            }
            this.functions[key] = functionSet[key];
        }
    }

    addFunction(tokenName, func) {
        if (!(func instanceof Function)) {
            throw new TypeError('addFunction expects a function as the second argument');
        }
        checkNoSuchToken(tokenName, this.tokens);

        this.functions[tokenName] = func;
    }

    removeFunction(tokenName) {
        checkNoSuchToken(tokenName, this.tokens);
        return delete this.functions[tokenName];
    }

    setErrTok(errTok) {
        checkErrorTokCollision(errTok, this.tokens);
        this.errTok = errTok;
    }

    disableStrict() {
        this.strict = false;
    }

    tokenize(aString) {
        checkErrorTokCollision(this.errTok, this.tokens);
        return tokenize(aString, this);
    }
}

module.exports = Tokenizer;
