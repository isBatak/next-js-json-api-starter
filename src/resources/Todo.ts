import { Resource } from 'kurier';

export class Todo extends Resource {
	static schema = {
		attributes: {
			title: String,
			body: String,
		},
		relationships: {},
	};
}
