# lexr
Lexical analyzer built in Javascript.  
  
lexr is meant to be a lightweight tokenizer that re-thinks how to do tokenizing instead of becoming just a flex clone.  
Moving to a modern language such as Javascript should allow the use of a lexical analyzer to be more modern and clean than the C ancestor.  

## Goals  
lexr is compartmentalized to be able to work on its own however is aimed to be used hand in hand with [grammr](https://github.com/zsmoore/grammr) once the project is finished.  
lexr and grammr are an effort to re-think how the traditional process of flex and bison work together and move development to a more modern process.  
  
Both of these projects are developed in order to be implemented in the re-work of [ivi](https://github.com/project-ivi/ivi) a project which aims to visualize code for the purpose of teaching intro programming.  

### Development Mindset  
lexr and grammr are, in their current form, aiming to take a hands off approach to user input.  
In order to keep the library lightweight and clean I am aiming to put more responsibility on the user's side to develop a non-ambiguous / non-token colliding language rather than bloating the library with checks. - this may change in the future.  

## Features  
The current Lexical Analyzer has built-in support for Javascript with a plan on extending to other languages.  
If you do not see your language supported or would like to simply use custom tokens it is possible to do so as well.   
  
As a result of having a lightweight library in mind, you can not currently add functions to the tokenizer to happen when a token is captured.  
This is an effort to re-think how things are done as well as stay lightweight.  
This way the user will either push off that functionality to the grammr or force the user to manually analyze the tokens and perform their own functions afterwards.

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


