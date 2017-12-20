/*

    Created by Zachary Moore
    github.com/zsmoore
    zsmoore@zachary-moore.com

    All token regex productions defined following
    ECMAScript Language Specification 5.1 Edition / June 2011
    Standard ECMA-262 
    Found at: https://www.ecma-international.org/ecma-262

*/

// General / whitespace
const lineTerminator = new RegExp(/(\u000A|\u000D|\u2028|\u2029)/);
const lineTerminatorSequence = new RegExp(/(\u000A|\u000D(?!\u000A)|\u2028|\u2029|\u000D\u000A)/);

//  Numeric Literal
const decimalDigit = new RegExp(/([0-9])/);
const decimalDigits = new RegExp('(' + decimalDigit.source + '+)');
const nonZeroDigit = new RegExp(/([1-9])/);
const decimalIntegerLiteral = new RegExp('(0|(' + nonZeroDigit.source + decimalDigits.source + '?))');
const signedInteger = new RegExp('((\\+|-)?' + decimalDigits.source + ')');
const exponentIndicator = new RegExp('(e|E)');
const exponentPart = new RegExp('(' + exponentIndicator.source + signedInteger.source + ')');
const decimalLiteral = new RegExp('((' + decimalIntegerLiteral.source + '\\.' 
    + decimalDigits.source + '?' + exponentPart.source + '?' + ')'
    + '|(\\.' + decimalDigits.source + exponentPart.source + '?' + ')'
    + '|(' + decimalIntegerLiteral.source + exponentPart.source + '?))');
const hexDigit = new RegExp(/([0-9]|[a-f]|[A-F])/);
const hexIntegerLiteral = new RegExp('((0x|0X)' + hexDigit.source + '+)');
const numericLiteral = new RegExp('(' + decimalLiteral.source + '|' + hexIntegerLiteral.source + ')');

// String Literal
const singleEscapeCharacter = new RegExp(/('|"|\\|b|f|n|r|t|v)/);
const escapeCharacter = new RegExp('(' + singleEscapeCharacter.source
    + '|' + decimalDigit.source
    + '|x|u)');
const nonEscapeCharacter = new RegExp('([^' + escapeCharacter.source 
    + '|' + lineTerminator.source + '])');
const characterEscapeSequence = new RegExp('(' + singleEscapeCharacter.source
    + '|' + nonEscapeCharacter.source + ')');
const hexEscapeSequence = new RegExp('(x' + hexDigit.source + hexDigit.source + ')');
const unicodeEscapeSequence = new RegExp('(u' + hexDigit.source + hexDigit.source +
    hexDigit.source + hexDigit.source + ')');
const escapeSequence = new RegExp('(' + characterEscapeSequence.source +
    + '|(0(?!' + decimalDigit.source + '))'
    + '|' + hexEscapeSequence.source +
    + '|' + unicodeEscapeSequence.source + ')');
const lineContinuation = new RegExp('(\\' + lineTerminatorSequence.source + ')');
const doubleStringCharacter = new RegExp('(([^\\"' + lineTerminator.source + '])|(\\'
    + escapeSequence.source + ')' 
    + '|(' + lineContinuation.source + '))');
const doubleStringCharacters = new RegExp('(' + doubleStringCharacter.source + '+)');
const singleStringCharacter = new RegExp("(([^\\'" + lineTerminator.source + "])|(\\"
    + escapeSequence.source + ")"
    + "|(" + lineContinuation.source + "))");
const singleStringCharacters = new RegExp('(' + singleStringCharacter.source + '+)');
const stringLiteral = new RegExp('(("' + doubleStringCharacters.source + '?")|(\''
    + singleStringCharacters.source + '?\'))');




// Final Exports
export const fullNumericLiteral = new RegExp('\\b' + numericLiteral.source + '\\b');
export const fullStringLiteral = new RegExp('\\b' + stringLiteral.source + '\\b');
