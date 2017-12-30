const Tokenizer = require('../src/token/tokenizer.js');
const assert = require('assert');

// Tokenizer
describe('Tokenizer', function() {
    describe('#constructor()', function() {
        it('should create without error', function() {
            const tok = new Tokenizer('');
            assert.equal('Custom', tok.language);
        });

        it('should throw languageNotFoundException', function() {
            assert.throws(function() { new Tokenizer('not a language'); });
        });

        it('should create with language set', function() {
            const language = 'Javascript';
            const tok = new Tokenizer(language);
            assert.equal(language, tok.language);
        });
    });

    describe('#addTokenSet()', function() {
        const tok = new Tokenizer('');
        const jsTok = new Tokenizer('Javascript');
        const tokenSet = {
            ADD: /\+/,
        };

        it('should throw typeError', function() {
            const tokenSet = 2;
            assert.throws(function() { tok.addTokenSet(tokenSet); });
        });

        it('should throw noCustomTokensException', function() {
            assert.throws(function() { jsTok.addTokenSet(tokenSet); });
        });

        it('should throw duplicateTokenException', function() {
            jsTok.disableStrict();
            assert.throws(function() { jsTok.addTokenSet(tokenSet); });
        });

        it('should throw typeError', function() {
            const nonReg = {
                NEW: 'test',
            };
            assert.throws(function() { tok.addTokenSet(nonReg); });
        });

        it('should allow regexp in 2 ways', function() {
            const multiReg = {
                REG1: /reg1/,
                REG2: new RegExp('reg2'),
            };
            tok.addTokenSet(multiReg);
        });
    });

    describe('#addToken()', function() {
        const tok = new Tokenizer('Javascript');
        it('should throw typeError', function() {
            assert.throws(function() { tok.addToken('TEST_TOK', 12); });
        });

        it('should throw noCustomTokensException', function() {
            assert.throws(function() { tok.addToken('TEST_TOK', /test_tok/); });
        });

        it('should throw duplicateTokenException', function() {
            tok.disableStrict();
            assert.throws(function() { tok.addToken('ADD', /add/); });
        });

        it('should add token into tokenSet', function() {
            tok.disableStrict();
            tok.addToken('NEW_TOKEN', /new_token/);
            assert.strictEqual('NEW_TOKEN' in tok.tokens, true);
        });
    });

    describe('#removeToken()', function() {
        const jsTok = new Tokenizer('Javascript');
        const tok = new Tokenizer('');
        it('should throw noCustomTokenException', function() {
            assert.throws(function() { jsTok.removeToken('ADD'); });
        });

        it('should return true for removing token', function() {
            tok.addToken('ADD', /add/);
            assert.strictEqual(tok.removeToken('ADD'), true);
            assert.strictEqual(tok.tokens.ADD, undefined);
        });

        it('should return true even for something not in tokenSet', function() {
            assert.strictEqual(tok.removeToken('SUB'), true);
        });
    });

    describe('#addIgnore()', function() {
        const jsTok = new Tokenizer('Javascript');
        it('should throw noSuchTokenException', function() {
            assert.throws(function() { jsTok.addIgnore('NOT_EXISTING'); });
        });

        it('should set ignore to be true for token', function() {
            jsTok.addIgnore('ADD');
            assert.strictEqual(jsTok.ignore.ADD, true);
        });
    });

    describe('#addIgnoreSet()', function() {
        const jsTok = new Tokenizer('Javascript');
        it('should throw type error for non-array or object', function() {
            assert.throws(function() { jsTok.addIgnoreSet('not an obj'); });
        });

        it('should throw noSuchTokenException within array', function() {
            const ignoreSet = ['WHITESPACE', 'NON_EXIST'];
            assert.throws(function() { jsTok.addIgnoreSet(ignoreSet); });
        });

        it('should set all ignored to true that are in the array', function() {
            const ignoreSet = ['WHITESPACE', 'NEW_LINE'];
            jsTok.addIgnoreSet(ignoreSet);
            for (let i = 0; i < ignoreSet.length; i++) {
                assert.strictEqual(jsTok.ignore[ignoreSet[i]], true);
            }
        });

        it('should throw noSuchTokenException within object', function() {
            const ignoreSet = {
                WHITESPACE: true,
                NOT_IN    : false,
            };
            assert.throws(function() { jsTok.addIgnoreSet(ignoreSet); });
        });

        it('should throw typeError on non-boolean within ignoreSet', function() {
            const ignoreSet = {
                WHITESPACE: 1,
                NOT_IN    : 'false',
            };
            assert.throws(function() { jsTok.addIgnoreSet(ignoreSet); });
        });

        it('should set all values in tokenizer ignore to ignoreset values', function() {
            const ignoreSet = {
                WHITESPACE: true,
                NEW_LINE  : false,
            };
            jsTok.addIgnoreSet(ignoreSet);
            for (const key in ignoreSet) {
                assert.strictEqual(ignoreSet[key], jsTok.ignore[key]);
            }
        });
    });

    describe('#unIgnore()', function() {
        const tok = new Tokenizer('');
        it('should throw noSuchTokenException', function() {
            assert.throws(function() { tok.unIgnore('NON_EXISTANT'); });
        });

        it('should unignore token', function() {
            tok.addToken('ADD', /add/);
            tok.addIgnore('ADD');
            assert.strictEqual(tok.ignore.ADD, true);
            tok.unIgnore('ADD');
            assert.strictEqual(tok.ignore.ADD, false);
        });
    });

    describe('#addCustomOutSet()', function() {
        const tok = new Tokenizer('Javascript');
        it('should throw typeError for non object', function() {
            assert.throws(function() { tok.addCustomOutSet(123); });
        });

        it('should throw noSuchTokenException', function() {
            const customOut = {
                NOT_IN: false,
            };
            assert.throws(function() { tok.addCustomOutSet(customOut); });
        });

        it('should set value in customOut from input', function() {
            const customOut = {
                WHITESPACE: '',
            };
            tok.addCustomOutSet(customOut);
            assert.strictEqual(tok.customOut.WHITESPACE, customOut.WHITESPACE);
        });
    });

    describe('#addCustomOut()', function() {
        const tok = new Tokenizer('Javascript');
        it('should throw noSuchTokenException', function() {
            assert.throws(function() { tok.addCustomOut('NOT_IN', false); });
        });

        it('should set customOut for single value', function() {
            tok.addCustomOut('WHITESPACE', false);
            assert.strictEqual(tok.customOut.WHITESPACE, false);
        });
    });

    describe('#removeCustomOut()', function() {
        const tok = new Tokenizer('');
        it('should throw noSuchTokenException', function() {
            assert.throws(function() { tok.removeCustomOut('NONE'); });
        });

        it('should return true for removing customOut', function() {
            tok.addToken('ADD', /add/);
            tok.addCustomOut('ADD', false);
            tok.removeCustomOut('ADD');
            assert.strictEqual(tok.customOut.ADD, undefined);
        });
    });

    describe('#addFunctionSet()', function() {
        const tok = new Tokenizer('Javascript');
        it('should throw typeError for not an object', function() {
            assert.throws(function() { tok.addFunctionSet('not an object'); });
        });

        it('should throw noSuchTokenException', function() {
            const functionSet = {
                NOT_IN: function() {},
            };
            assert.throws(function() { tok.addFunctionSet(functionSet); });
        });

        it('should throw typeError', function() {
            const functionSet = {
                WHITESPACE: false,
            };
            assert.throws(function() { tok.addFunctionSet(functionSet); });
        });

        it('should set functionSet to be input value', function() {
            const functionSet = {
                WHITESPACE: function() { /*this is a function*/ },
            };
            tok.addFunctionSet(functionSet);
            assert.strictEqual(tok.functions.WHITESPACE, functionSet.WHITESPACE);
        });
    });

    describe('#addFunction()', function() {
        const tok = new Tokenizer('Javascript');
        it('should throw typeError on non Function', function() {
            assert.throws(function() { tok.addFunction('ADD', 123); });
        });

        it('should throw noSuchTokenException', function() {
            assert.throws(function() { tok.addFunction('NONE', function() {}); });
        });

        it('should assign functions to have same value as input', function() {
            const fun = function() { console.log('test'); };
            tok.addFunction('ADD', fun);
            assert.strictEqual(tok.functions.ADD, fun);
        });
    });

    describe('#removeFunction()', function() {
        const tok = new Tokenizer('Javascript');
        it('should throw noSuchTokenException', function() {
            assert.throws(function() { tok.removeFunction('None'); });
        });

        it('should remove function from tokenizer', function() {
            tok.addFunction('ADD', function() {});
            tok.removeFunction('ADD');
            assert.strictEqual(tok.functions.ADD, undefined);
        });
    });

    describe('#setErrTok()', function() {
        const tok = new Tokenizer('Javascript');
        it('should throw errorTokenCollisionException', function() {
            assert.throws(function() { tok.setErrTok('ADD'); });
        });

        it('should set errTok to be input', function() {
            tok.setErrTok('Error2');
            assert.strictEqual(tok.errTok, 'Error2');
        });
    });

    describe('#tokenize()', function() {
        const tok = new Tokenizer('');
        it('should throw errorTokenCollisionException', function() {
            tok.addToken('ERROR', /err/);
            assert.throws(function() { tok.tokenize('test'); });
        });

        it('should return empty list for no tokens set', function() {
            const tok = new Tokenizer('');
            const output = tok.tokenize('');
            assert.strictEqual(output.length, 0);
        });
    });
});
