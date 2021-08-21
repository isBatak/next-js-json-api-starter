exports.up = function (knex) {
	return knex.schema
		.createTable('authors', function (table) {
			table.increments('id').primary();
			table.text('name', 255).notNullable();
			table.timestamp(true, true);
		})
		.alterTable('todos', function (table) {
			table.foreign('author_id').references('authors.id');
		});
};

exports.down = function (knex) {
	return knex.schema
		.table('todos', function (table) {
			table.dropColumn('author_id');
		})
		.dropTable('authors');
};
