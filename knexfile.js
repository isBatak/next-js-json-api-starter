require('dotenv-flow').config();

console.log(process.env.DB_CONNECTION_STRING);

module.exports = {
	client: 'pg',
	connection: process.env.DB_CONNECTION_STRING,
	useNullAsDefault: true,
	debug: true,
	migrations: {
		directory: './src/migrations',
		loadExtensions: ['.js'],
	},
};
