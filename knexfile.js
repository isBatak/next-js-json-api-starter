require('dotenv').config();

module.exports = {
	client: 'pg',
	connection: process.env.DB_CONNECTION_STRING,
	useNullAsDefault: true,
	debug: true,
	migrations: {
		directory: './src/kurier/migrations',
		loadExtensions: ['.js'],
	},
};
