let Tokenizer = require('../src/token/tokenizer.js');
let assert = require('assert');

// Tokenizer
describe('Tokenizer', function() {
    describe('#constructor()', function() {
        it('should create without error', function() {
            let tok = new Tokenizer("");
            assert.equal("Custom", tok.language);
        });

        it('should throw languageNotFoundException', function() {
            assert.throws(function() {new Tokenizer("not a language");});
        });

        it('should create with language set', function() {
            let language = 'Javascript';
            let tok = new Tokenizer(language);
            assert.equal(language, tok.language);
        });
    });

    describe('#addTokenSet()', function() {
        let tok = new Tokenizer("");
        let jsTok = new Tokenizer("Javascript");
        let tokenSet = {
            ADD : /\+/
        };

        it('should throw typeError', function() {
           let tokenSet = 2;
           assert.throws(function() { tok.addTokenSet(tokenSet);});
        });

        it('should throw noCustomTokensException', function() {
            assert.throws(function() { jsTok.addTokenSet(tokenSet);});            
        });

        it('should throw duplicateTokenException', function() {
            jsTok.disableStrict();
            assert.throws(function() { jsTok.addTokenSet(tokenSet);});
        });
        
        it('should throw typeError', function() {
            let nonReg = {
                NEW : 'test'
            };
            assert.throws(function() { tok.addTokenSet(nonReg);});            
        });

        it('should allow regexp in 2 ways', function() {
            let multiReg = {
                REG1   : /reg1/,
                REG2   : new RegExp('reg2')
            };
            tok.addTokenSet(multiReg);
        });
    });

    describe('#addToken()', function() {
        let tok = new Tokenizer("Javascript");
        it('should throw typeError', function() {
            assert.throws(function() { tok.addToken("TEST_TOK", 12);});
        });

        it('should throw noCustomTokensException', function() {
            assert.throws(function() { tok.addToken("TEST_TOK", /test_tok/);});
        });

        it('should throw duplicateTokenException', function() {
            tok.disableStrict();
            assert.throws(function() { tok.addToken("ADD", /add/);});
        });

        it('should add token into tokenSet', function() {
            tok.disableStrict();
            tok.addToken("NEW_TOKEN", /new_token/);
            assert.strictEqual("NEW_TOKEN" in tok.tokens, true);
        });
    });

    describe('#removeToken()', function() {
        let jsTok = new Tokenizer("Javascript");
        let tok = new Tokenizer("");
        it ('should throw noCustomTokensException', function() {
            assert.throws(function() {jsTok.removeToken("ADD");});
        });

        it ('should return true for removing token', function() {
            tok.addToken("ADD", /add/);
            assert.strictEqual(tok.removeToken("ADD"), true);
        });

        it ('should return true even for something not in tokenSet', function() {
            assert.strictEqual(tok.removeToken("SUB"), true);
        });
    });
});
