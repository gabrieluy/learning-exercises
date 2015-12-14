TOC
===

1. [Description](#description)
2. [Installation](#installation)
3. [Tests](#tests)
4. [Usage](#usage)

<a name='description'></a>
# Description

A plain Node.js (no libraries used) terminal program that reads the accompanied JSON file (folders_lists_and_tasks.json).

The file contains data and based on this, your program should write to the standard output as shown in the expected_output.txt file.

- Folders contain all lists for which they have an id in their values field
- Folders should be sorted by the position of their first list
- Lists that are not inside a folder are at the root level
- Lists should be sorted by the order of their ids in the list_position.values array
- Tasks should be sorted by the order of their ids in the corresponding task_position.values array for a given list
- When in doubt of the sorting order, have a look at the expected output.

<a name='installation'></a>
# Installation

Install node >= 5, then:

```shell
npm install
```

<a name='tests'></a>
# Tests

Right now the tests have 100% coverage:

```shell
npm test
```

<a name='usage'></a>
# Usage

Call `index.js` passing the path of the json as the first argument. Example with the provided .json:

```shell
./index.js test/fixtures/folders_lists_and_tasks.json
```
