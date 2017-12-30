import { DuplicateTokenException,
    ErrorTokenCollisionException,
    LanguageNotFoundException,
    NoCustomTokensException,
    NoSuchTokenException } from '../src/exceptions/exception.js';
const assert = require('assert');

describe('Exceptions', function() {
    const language = 'Python';
    const tok = 'E';
    describe('LanguageNotFoundException', function() {
        it('should produce proper toString', function() {
            const e = new LanguageNotFoundException(language);
            const expected = '\'' + language + '\' not a valid language of pre-defined tokens!';
            assert.strictEqual(e.toString(), expected);
        });
    });

    describe('NoCustomTokensException', function() {
        it('should produce proper toString', function() {
            const e = new NoCustomTokensException(language);
            const expected = 'You are trying to add or remove tokens to a pre-existing language \''
                + language + '\' but you did not specify non-strict tokenizing';
            assert.strictEqual(e.toString(), expected);
        });
    });

    describe('DuplicateTokenException', function() {
        it('should produce proper toString', function() {
            const e = new DuplicateTokenException(tok);
            const expected = '\'' + tok + '\' already exists in your token set.  You must first remove ' +
                'it if you would like to override the token';
            assert.strictEqual(e.toString(), expected);
        });
    });

    describe('NoSuchTokenException', function() {
        it('should produce proper toString', function() {
            const e = new NoSuchTokenException(tok);
            const expected = '\'' + tok + '\' does not exist in your token set.';
            assert.strictEqual(e.toString(), expected);
        });
    });

    describe('ErrorTokenCollisionException', function() {
        it('should produce proper toString', function() {
            const e = new ErrorTokenCollisionException(tok);
            const expected = '\'' + tok + '\' is in your token set. Choose an error '
                + 'token that is not in your set.';
            assert.strictEqual(e.toString(), expected);
        });
    });
});
