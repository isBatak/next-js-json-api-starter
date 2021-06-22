import { Attribute } from '@datx/core';
import { Resource } from '@datx/jsonapi-react';

export class Todo extends Resource {
	static type = 'todos';

	@Attribute({ isIdentifier: true })
	public id!: string | number;

	@Attribute()
	public title!: string;

	@Attribute()
	public body!: string;
}
