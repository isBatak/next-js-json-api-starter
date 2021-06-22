const path = require('path');

module.exports = {
	development: {
		client: 'pg',
		connection: 'postgres://postgres:uBYNkja4QjR7L9V@db.osbuycvzriprmjnoehzm.supabase.co:5432/postgres',
		useNullAsDefault: true,
		debug: true,
	},
};
