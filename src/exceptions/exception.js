export class languageNotFoundException {
    constructor(value) {
        this.value = value;
        this.message = " not a valid language of pre-defined tokens!";
    }
    toString() {
        return "'" + this.value + "'" + this.message;
    }
}

export class noCustomTokensException {
    constructor(language) {
        this.value = language;
        this.message = "You are trying to add or remove tokens to a pre-existing language '"
            + this.value + "' but you did not specify non-strict tokenizing";
    }
    toString() {
        return this.message;
    }
}

export class duplicateTokenException {
    constructor(token) {
        this.value = token;
        this.message = " already exists in your token set.  You must first remove " +
            "it if you would like to override the token";
    }
    toString() {
        return "'" + this.value + "'" + this.message;
    }
}
