const debug = require('debug')('sql');
const chalk = require('chalk');
const Sequelize = require('sequelize');
const pkg = require('../package.json');

const dbName = process.env.DATABASE_NAME || pkg.database;
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`;
// flip this on for deploy
// const connectionString = process.env.DATABASE_URL || `postgres://alice:test@localhost:5432/${dbName}`;

console.log(chalk.yellow(`Opening database connection to ${connectionString}`));

// create the database instance that can be used in other database files
const db = new Sequelize(connectionString, {
	logging: debug, // export DEBUG=sql in the environment to get SQL queries OR false
	native: false   // use pg-native for ~30% more speed, use false to ignore for now
});

module.exports = db;

// run our models file (makes all associations for our Sequelize objects)
require('./models');

// sync the db, creating it if necessary
//use force=true to drop all tables and re-create
function sync(force=false, retries=0, maxRetries=5) {
	return db.sync({force})
	.then(ok => console.log(`Synced models to db ${connectionString}`))
	.catch(fail => {
		// Don't autocreate if prod or if retried too many times
		if (process.env.NODE_ENV === 'production' || retries > maxRetries) {
			console.error(chalk.red(`********** database error ***********`));
			console.error(chalk.red(`    Couldn't connect to ${connectionString}`));
			console.error();
			console.error(chalk.red(fail));
			console.error(chalk.red(`*************************************`));
			return
		}
		// Else do autocreate
		// this does not work, must fix. create via Postico for now
		console.log(`${retries ? `[retry ${retries}]` : ''} Creating database ${dbName}...`)
		return new Promise(
		  (resolve, reject) => require('child_process').exec(`CREATE DATABASE "${dbName}"`, resolve)
		)
		.then(() => sync(true, retries + 1));
	});
}

db.didSync = sync();

// Note: To seed db, run node seed. See package.json