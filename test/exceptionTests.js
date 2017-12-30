import { languageNotFoundException, noCustomTokensException, duplicateTokenException, noSuchTokenException, errorTokenCollisionException } from '../src/exceptions/exception.js';
let assert = require('assert');

describe('Exceptions', function() {
    let language = 'Python';
    let tok = 'E';
    describe('languageNotFoundException', function() {
        it ('should produce proper toString', function() {
            let e = new languageNotFoundException(language);
            let expected = '\'' + language + '\' not a valid language of pre-defined tokens!';
            assert.strictEqual(e.toString(), expected);
        });
    });

    describe('noCustomTokensException', function() {
        it ('should produce proper toString', function() {
            let e = new noCustomTokensException(language);
            let expected = 'You are trying to add or remove tokens to a pre-existing language \''
                + language + '\' but you did not specify non-strict tokenizing';
            assert.strictEqual(e.toString(), expected);
        });
    });

    describe('duplicateTokenException', function() {
        it ('should produce proper toString', function() {
            let e = new duplicateTokenException(tok);
            let expected = '\'' + tok + '\' already exists in your token set.  You must first remove ' +
                'it if you would like to override the token';
            assert.strictEqual(e.toString(), expected);
        });
    });

    describe('noSuchTokenException', function() {
        it ('should produce proper toString', function() {
            let e = new noSuchTokenException(tok);
            let expected = '\'' + tok + '\' does not exist in your token set.';
            assert.strictEqual(e.toString(), expected);
        });
    });

    describe('errorTokenCollisionException', function() {
        it ('should produce proper toString', function() {
            let e = new errorTokenCollisionException(tok);
            let expected = '\'' + tok + '\' is in your token set. Choose an error '
                + 'token that is not in your set.';
            assert.strictEqual(e.toString(), expected);
        });
    });
});
