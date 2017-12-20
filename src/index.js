import { Tokenizer } from "./token/tokenizer.js"

let input = ` if ( true ) {
    false;
    } else {
    let variable = 123.2
    }`;

let input2 = `var a = 5;
var b = 'test Variable';
var c = 10;
var d = 500;
var e = f = g = h = c / d;
var condition1 = g < b;
var condition2 = c > d;
var condition3 = c > a;
if (condition1) {
    var a = false;
} else if (false) {
    var b = 20;
} else if (condition2) {
    var c = 'not executed';
} else if (condition3) {
    var d = 'This will be executed';  
    if (condition1) {
        var a = false;
    } else if (false) {
        var b = 20;
    } else if (condition2) {

        var c = 'not executed';
    } else if (condition3) {
        var d = 'This will be executed';
    } else {
        var e = undefined;    
    }
} else {
    var els = 'esle';
}
var end = 'end';`;



let tokenizer = new Tokenizer("Javascript");
console.log(tokenizer.parse(input2));
