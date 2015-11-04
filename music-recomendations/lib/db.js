const PRODUCTION_DB_NAME = 'smr';
const TEST_DB_NAME = 'smrTest';
const DB_NAME = process.env.NODE_ENV === 'test' ? TEST_DB_NAME : PRODUCTION_DB_NAME;

const db =  require('monk')(`localhost/${DB_NAME}`);

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

function cleanup() {
    console.log('Closing Mongo connection...');
    db.close();
    console.log('Mongo connection closed.');
    process.exit();
}

module.exports = db;
