import { Resource } from 'kurier';

import Todo from '@/kurier/resources/todo';

export default class Author extends Resource {
	static schema = {
		attributes: {
			name: String,
		},
		relationships: {
			todos: {
				type: () => Todo,
				hasMany: true,
				foreignKeyName: 'author_id',
			},
		},
	};
}
