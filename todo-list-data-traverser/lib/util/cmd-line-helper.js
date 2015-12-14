'use strict';
//TODO criar testes para essa classe

function printHelp() {
    const scriptName = process.argv[1].split('/').pop();
    const help = `
JSON Data Transformer

Usage:
    ./${scriptName} json-input-file
or:
    node ${scriptName} json-input-file
`;

    process.stdout.write(help);
}

function processArguments() {
    const input = process.argv[2] && process.argv[2].trim();
    if (!input) {
        printHelp();
        process.exit(1);
    } else if (input === '-h' || input === '--help') {
        printHelp();
        process.exit(0);
    }
}

module.exports = { printHelp, processArguments };
