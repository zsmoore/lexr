import { parse } from "./parse/parse.js"

let input = ` if ( true ) {
    false;
    } else {
    let variable = 123.2
    }`;
parse(input);
