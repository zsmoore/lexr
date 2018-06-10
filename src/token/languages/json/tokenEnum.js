export const jsonTokens = {

    COMMA:  /,/,
    COLON: /:/,
    L_BRACKET: /\[/,
    R_BRACKET: /\]/,
    L_BRACE: /{/,
    R_BRACE: /}/,
    TRUE:   /true/,
    FALSE: /false/,
    NULL:  /null/,
    DOUBLE_QUOTE: /"/,
    DIGIT1To9: /[1-9]/,
    NEGATIVE: /-/,
    DIGIT : /[0-9]/,
    DOT: /\./,
    E: /(e|e\+|e-|E|E\+|E-)$/,
    CHAR: /([0-9]|[a-z]|[A-Z])/,
    WHITESPACE: new RegExp(/(\u0009|\u000B|\u000C|\u0020|\u00A0|\uFEFF)/),
    NEW_LINE: new RegExp(/(\u000A|\u000D(?!\u000A)|\u2028|\u2029|\u000D\u000A)/)
};