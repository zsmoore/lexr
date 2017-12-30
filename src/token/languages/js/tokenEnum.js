import { comments,
    fullNumericLiteral,
    fullRegularExpressionLiteral,
    fullStringLiteral,
    lineTerminatorSequence,
    whiteSpace } from './extendedRegex.js';
import { identifier } from './identifierRegex.js';
/*

    Created by Zachary Moore
    github.com/zsmoore
    zsmoore@zachary-moore.com

    All token regex productions defined following
    ECMAScript Language Specification 5.1 Edition / June 2011
    Standard ECMA-262
    Found at: https://www.ecma-international.org/ecma-262

*/

export const jsTokens = {

    // White Space / Comments
    WHITESPACE: whiteSpace,
    COMMENT   : comments,
    NEW_LINE  : lineTerminatorSequence,

    // Identifier
    IDENTIFIER: identifier,

    // Keywords
    BREAK     : /break/,
    CASE      : /case/,
    CATCH     : /catch/,
    CONTINUE  : /continue/,
    DEBUGGER  : /debugger/,
    DEFAULT   : /default/,
    DELETE    : /delete/,
    DO        : /do/,
    ELSE      : /else/,
    FINALLY   : /finally/,
    FOR       : /for/,
    FUNCTION  : /function/,
    IF        : /if/,
    IN        : /in/,
    INSTANCEOF: /instanceof/,
    NEW       : /new/,
    RETURN    : /return/,
    SWITCH    : /switch/,
    THIS      : /this/,
    THROW     : /throw/,
    TRY       : /try/,
    TYPEOF    : /typeof/,
    VAR       : /var/,
    VOID      : /void/,
    WHILE     : /while/,
    WITH      : /with/,

    // Future Reserved (ES6+)
    CLASS  : /class/,
    CONST  : /const/,
    ENUM   : /enum/,
    EXPORT : /export/,
    EXTENDS: /extends/,
    IMPORT : /import/,
    SUPER  : /super/,

    // Strict Future Reserved
    IMPLEMENTS: /implements/,
    INTERFACE : /interface/,
    LET       : /let/,
    PACKAGE   : /package/,
    PRIVATE   : /private/,
    PROTECTED : /protected/,
    PUBLIC    : /public/,
    STATIC    : /static/,
    YIELD     : /yield/,

    // Punctuators
    L_BRACE        : /{/,
    R_BRACE        : /}/,
    L_PAREN        : /\(/,
    R_PAREN        : /\)/,
    L_BRACKET      : /\[/,
    R_BRACKET      : /\]/,
    DOT            : /\./,
    SEMI_COLON     : /;/,
    COMMA          : /,/,
    L_THAN         : /</,
    G_THAN         : />/,
    L_THAN_EQ      : /<=/,
    G_THAN_EQ      : />=/,
    EQUAL          : /==/,
    NOT_EQ         : /!=/,
    STRICT_EQ      : /===/,
    NOT_STRICT_EQ  : /!==/,
    ADD            : /\+/,
    SUB_OR_NEG     : /-/,
    MUL            : /\*/,
    MOD            : /%/,
    INC            : /\+\+/,
    DECR           : /--/,
    ZERO_FILL_LEFT : /<</,
    SIGNED_RIGHT   : />>/,
    ZERO_FILL_RIGHT: />>>/,
    BIT_AND        : /&/,
    BIT_OR         : /|/,
    XOR            : /^/,
    NOT            : /!/,
    BIT_NOT        : /~/,
    AND            : /&&/,
    OR             : /||/,
    TERN_IF        : /\?/,
    TERN_ELSE      : /:/,
    ASSIGN         : /=/,
    ADD_ASSIGN     : /\+=/,
    SUB_ASSIGN     : /-=/,
    MUL_ASSIGN     : /\*=/,
    MOD_ASSIGN     : /%=/,
    SHIFTL_ASSIGN  : /<<=/,
    SHIFTR_ASSIGN  : />>=/,
    ZFILLR_ASSIGN  : />>>=/,
    BIT_AND_ASSIGN : /&=/,
    BIT_OR_ASSIGN  : /|=/,
    BIT_XOR_ASSIGN : /^=/,
    DIV            : new RegExp('/'),
    DIV_ASSIGN     : new RegExp('/='),

    // Literals
    NULL_LIT  : /null/,
    TRUE_LIT  : /true/,
    FALSE_LIT : /false/,
    NUM_LIT   : fullNumericLiteral,
    STRING_LIT: fullStringLiteral,
    REGEXP_LIT: fullRegularExpressionLiteral,

};
