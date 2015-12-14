#!/usr/bin/env node
'use strict';

const cmdLineHelper = require('./lib/util/cmd-line-helper');
const JsonHandler = require('./lib/util/json-handler');
const DataTransformer = require('./lib/data-transformer');

cmdLineHelper.processArguments();

const jsonFilePath = process.argv[2].trim();

const writeOut = console.log.bind(console);
const writeErr = console.log.bind(console, 'ERROR:');

const rawData = JsonHandler.jsObjFromJsonFile(jsonFilePath);

new DataTransformer(rawData)
.transform()
.then(writeOut)
.catch(writeErr)
