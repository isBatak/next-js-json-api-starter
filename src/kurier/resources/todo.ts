import { Resource } from 'kurier';

import Author from './author';

export default class Todo extends Resource {
	static schema = {
		attributes: {
			title: String,
			body: String,
		},
		relationships: {
			author: {
				type: () => Author,
				belongsTo: true,
				foreignKeyName: 'author_id',
			},
		},
	};
}
