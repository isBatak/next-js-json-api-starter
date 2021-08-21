import { Attribute } from '@datx/core';
import { Resource } from '@datx/jsonapi-react';

export class Author extends Resource {
	static type = 'todo';

	@Attribute({ isIdentifier: true })
	public id!: string | number;

	@Attribute()
	public name!: string;
}
