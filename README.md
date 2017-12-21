# lexr
Lexical analyzer built in Javascript.  

## Features  
The current Lexical Analyzer has built-in support for Javascript with a plan on extending to other languages.  
If you do not see your language supported or would like to simply use custom tokens it is possible to do so as well. 

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
If you have selected a built-in language you will not be able to add more tokens until you disable `strict` mode for tokens.  
To do so call the `disableStrict()` function on the tokenizer instance.  

Once you have done so or if you are working on a fully custom tokenizer you can add tokens 2 ways:
```javascript
// Add a single token
// Arguments: tokenName, RegExp pattern
tokenizer.addToken("L_PAREN", /\(/);

// Add multiple tokens
// Must be in the form of a Javascript Object
const tokens = {
  L_BRACE : /{/,
  R_BRACE : new RegExp('}').source,
};
tokenizer.addTokens(tokens);
```
You can also remove pre-existing tokens if you are using a custom language or have disabled `strict` mode.  
```javascript
tokenizer.removeToken("L_PAREN");
```
Lastly in order to parse your input code simply call the tokenizer's parse method.  
```javascript
let output = tokenizer.parse(aString);
```  

