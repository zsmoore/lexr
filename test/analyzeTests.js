import { tokenize } from '../src/analyze/analyze.js';
let Tokenizer = require('../src/token/tokenizer.js');
let assert = require('assert');

function listEquality(actual, expected) {
    for (let i = 0; i < actual.length; i++) {
        if (actual[i] === undefined || expected[i] === undefined) {
            return false;
        }
        if (actual[i].token !== expected[i].token) {
            return false;
        }
        if (actual[i].value !== expected[i].value) {
            return false;
        }

        if ('customOut' in actual[i]) {
            if (actual[i].customOut !== expected[i].customOut) {
                return false;
            }
        }
    }
    return true;
}


describe('Analyze', function() {
    describe('tokenize', function() {
        let tok = new Tokenizer("Javascript");
        it ('should produce empty output', function() {
            let output = tokenize('', tok);
            assert.strictEqual(output.length, 0);
        });

        it ('should produce simple output', function() {
            let tok = new Tokenizer("Javascript");
            tok.addIgnore('WHITESPACE');
            let input = "var c = 5;";                
            let expected = [
                { token: 'VAR', value: 'var' },
                { token: 'IDENTIFIER', value: 'c' },
                { token: 'ASSIGN', value: '=' },
                { token: 'NUM_LIT', value: '5' },
                { token: 'SEMI_COLON', value: ';' } ];
            let output = tokenize(input, tok);
            assert.strictEqual(listEquality(output, expected), true);
        });

        it ('should return single error token', function() {
            let tok = new Tokenizer("");
            let input = 'a';
            let expected = [
                { token: 'ERROR', value: 'a' } ];
            let output = tokenize(input, tok);
            assert.strictEqual(listEquality(output, expected), true);
        });

        it ('should test equality on customOut', function() {
            tok.addCustomOut('WHITESPACE', true);
            let input = ' ';
            let expected = [
                { token: 'WHITESPACE', value: ' ', customOut: true } ];
            let output = tokenize(input, tok);
            assert.strictEqual(listEquality(output, expected), true);
        });

        it ('should activate function', function() {
            tok.addFunction('SEMI_COLON', function() { semiColonCount += 1 });
            let semiColonCount = 0;
            let input = ';';
            tokenize(input, tok);
            assert.strictEqual(semiColonCount, 1);
        });
    });    
});
