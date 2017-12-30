# lexr  
[![Build Status via Travis CI](https://travis-ci.org/zsmoore/lexr.svg?branch=develop)](https://travis-ci.org/zsmoore/lexr)
[![NPM version](https://img.shields.io/npm/v/lexr.svg)](https://www.npmjs.com/package/lexr)
[![NPM Downloads](https://img.shields.io/npm/dm/lexr.svg?style=flat)](https://www.npmjs.org/package/lexr)  
[![Dependency Status](https://david-dm.org/zsmoore/lexr.svg?theme=shields.io)](https://david-dm.org/zsmoore/lexr)
[![devDependency Status](https://david-dm.org/zsmoore/lexr/dev-status.svg?theme=shields.io)](https://david-dm.org/zsmoore/lexr#info=devDependencies)  
[![Coverage Status](https://coveralls.io/repos/zsmoore/lexr/badge.svg?branch=develop)](https://coveralls.io/r/zsmoore/lexr?branch=develop)
[![Code Climate](https://img.shields.io/codeclimate/github/zsmoore/lexr.svg?style=flat-square)](https://codeclimate.com/github/zsmoore/lexr)

Lexical analyzer built in Javascript.  
  
lexr is meant to be a lightweight tokenizer built in Javascript to be more modern and clean than the C ancestor.  

## Goals  
lexr is compartmentalized to be able to work on its own however is aimed to be used hand in hand with [grammr](https://github.com/zsmoore/grammr) once the project is finished.  
lexr and grammr are an effort to re-think how the traditional process of flex and bison work together and move development to a more modern process.  
  
Both of these projects are developed in order to be implemented in the re-work of [ivi](https://github.com/project-ivi/ivi) a project which aims to visualize code for the purpose of teaching intro programming.  

## Features  
The current Lexical Analyzer has built-in support for Javascript with a plan on extending to other languages.  
If you do not see your language supported or would like to simply use custom tokens it is possible to do so as well.   
  
As a result of having a lightweight library in mind, you can not currently add functions to the tokenizer to happen when a token is captured.  

What is currently supported is  
* Using built-in or custom tokens
* Adding Tokens either one by one or in a set to the tokenizer
* Error Detection
* Functions on Token Recognition
* Overwriting error token name
* Removing Tokens from the token set
* Ignoring tokens for output either one by one or in a set  
* UnIgnoring tokens from the token set
* Custom Output for tokens  
* Removing custom output for tokens

## Future Features
Before the v1.0.0 release I would like to add:  
* Changing / Overriding token output
  
If there are any good freatures missing feel free to open an issue for a feature request.
  
## Built-In Language Support
* Javascript  

## Usage  
The entire library wraps around a `Tokenizer` class.  
First import the library  
```javascript
let lexr = require('lexr');
```
In order to use built-in languages, initialize the tokenizer as so:  
```javascript
let tokenizer = new lexr.Tokenizer("Javascript");
```
If you would like to use fully custom tokens then simply initialize as so:  
```javascript
let tokenizer = new lexr.Tokenizer("");
```
If you have selected a built-in language you will not be able to add or remove tokens until you disable `strict` mode for tokens.  
To do so call the `disableStrict()` function on the tokenizer instance.  

### Tokens
Once you have done so or if you are working on a fully custom tokenizer you can add tokens 2 ways:
```javascript
// Add a single token
// Arguments: tokenName, RegExp pattern
tokenizer.addToken("L_PAREN", /\(/);

// Add multiple tokens
// Must be in the form of a Javascript Object
const tokens = {
  L_BRACE : /{/,
  R_BRACE : new RegExp('}'),
};
tokenizer.addTokenSet(tokens);
```
You can also remove pre-existing tokens if you are using a custom language or have disabled `strict` mode.  
```javascript
tokenizer.removeToken("L_PAREN");
```

### Functions
If you would like to add functions when tokens are recognized you can add them through a set or through individual addition by calling the proper `addFunction` function.  
```javascript
// Add functions through set
let funs = {
  WHITESPACE  : function() { whitespaceCount += 1 },
  IDENTIFIER  : function() { idNum += 1 }
}
tokenizer.addFunctionSet(funs);

// Add single function
tokenizer.addFunction("NEW_LINE", function() { lineCount += 1 });

// Remove function
tokenizer.removeFunction("IDENTIFIER");
```    
### Function Usage  
lexr separates itself from flex a bit in how functions are handled.  
Your functions should not use any of the information taken from the current token since you have access to that information post tokenization.  
This keeps the functions that are being executed smaller and cleaner.

### Example Function Usage  
An example of code that would go with the functions is as follows
```javascript
let funs = {
  WHITESPACE  : function() { whitespaceCount += 1 },
  NEW_LINE    : function() { idNum += 1 }
}
tokenizer.addFunctionSet(funs);
let input = `var a = 4;
             var b = 3;`;            
let whitespaceCount = 0;
let idNum = 0;
tokenizer.tokenize(input);
```
### Function Scoping Oddities  
Since functions are contained within an object in the tokenizer scoping can get a bit iffy.  
You can use the example above however, a suggested usage is to make a `functions.js` in order to:  
* declare all of your tokens to functions
* declare any variables you need outside of the function object
* export the function object as well as any variables you want access to to the proper files

### yytext Function Alternative  
Instead of using yytext within your functions the suggested usage is to analyze post tokenization.  
An example of grabbing all identifier names and inserting them into let's say a symbol table would look like:
```javascript
let input = `var a = 4;
             var b = 3;`;
let output = tokenizer.tokenize(input);

let symbolTable = {};
for (let i = 0; i < output.length; i++) {
  if (output[i].token === "IDENTIFIER") {
    symbolTable[output[i].value] = undefined;
    }    
}
```

### Error Token
By default the error token name when detecting an uncaught token will be `ERROR` however, if you would like to change the name you can do so by calling `setErrTok` as so:
```javascript
tokenizer.setErrTok("DIFF_ERROR");
```

### Ignore Tokens
You can also ignore certain tokens from appearing in the output by either calling `addIgnore`
```javascript
tokenizer.addIgnore("WHITESPACE");
```
Or by adding an entire set through an array or an object
```javascript
let ignore = ["WHITESPACE", "VAR"];
tokenizer.addIgnoreSet(ignore);

// Or through an object which allows true or false
let ignore2 = {
  "WHITESPACE"  : true,
  "VAR"         : false,
};
tokenizer.addIgnoreSet(ignore2);
```

If you would like to unIgnore tokens programatically just call the `unIgnore` method
```javascript
tokenizer.unIgnore("WHITESPACE");
```  
### Custom Output
There are options to make your output more verbose by adding a `customOut` field to the output object.  
Similarly to how other operations work you can either add a set of tokens or a single token as well as remove them.
```javascript
// Add a set of custom outputs
let customOut = {
  "WHITESPACE"  : 2,
  "VAR"         : 'declaration',
}
tokenizer.addCustomOutSet(customOut);

// Add a single custom output
tokenizer.addCustomOut("SEMI_COLON", 111);

// Remove a custom out
tokenizer.removeCustomOut("VAR");
```  
A sample output object would then look like:  
```javascript
{ token: 'WHITESPACE', value: ' ', customOut: 2 }
```

### Tokenization
Lastly in order to tokenize your input code simply call the tokenizer's tokenize method.  
```javascript
let output = tokenizer.tokenize(aString);
```  

## Output  
In its current form the output from `tokenize(aString)` will be in the form of a list of Objects each having 2 properties.  
`token` being the token captured, and `value` being what determined the token.  
  
## Sample Program  
```javascript  
let lexr = require('lexr');
let tokenizer = new lexr.Tokenizer("Javascript");
let input = "var a = null;";
let output = tokenizer.tokenize(input);
console.log(output);
```  
Output would then be
```javascript
[ { token: 'VAR', value: 'var' },
  { token: 'WHITESPACE', value: ' ' },
  { token: 'IDENTIFIER', value: 'a' },
  { token: 'WHITESPACE', value: ' ' },
  { token: 'ASSIGN', value: '=' },
  { token: 'WHITESPACE', value: ' ' },
  { token: 'NULL_LIT', value: 'null' },
  { token: 'SEMI_COLON', value: ';' } ]
```
## Sample Program with Token Errors
```javascript
let lexr = require('lexr');
let tokenizer = new lexr.Tokenizer("");
tokenizer.addToken("PLUS", /\+/);
tokenizer.setErrTok("DIFF_ERROR");
let input = "5+5;";
let output = tokenizer.tokenize(input);
console.log(output);
```
Output would then be  
```javascript
[ { token: 'DIFF_ERROR', value: '5' },
  { token: 'PLUS', value: '+' },
  { token: 'DIFF_ERROR', value: '5;' } ]
```
  
## Suggested Workflow  
How I suggest development if you are not using built-in languages is to separate each part of the tokenization into its own file.  
If you are using a complex language where the regexes can become very large, separate the building up of those regexes to another file and only export the final regex to your token object.  
  
Since the `Tokenizer` can take in sets of information it is easiest to separate everything and use exports between files.
### Sample project structure
```
+-- src/
| +-- index.js
| +-- functions/
|   +-- functions.js
| +-- tokens/
|   +-- tokens.js
|   +-- regexPatterns.js
| +-- ignore/
|   +-- ignoreTokens.js
| +-- customOut/
|   +-- customOutput.js
