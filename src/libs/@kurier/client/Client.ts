import { Store } from '@kurier/store';
import { QueryBuilder } from './QueryBuilder';
export class Client {
	private store: Store;

	constructor({ store }) {
		this.store = store;
	}

	public prepareQuery(fn) {
		return fn(new QueryBuilder());
	}

	public query(queryExpression, options) {
		debugger;
		console.log(queryExpression);

		return null;
	}

	public queryExpression(expression) {
		// const url = expresionToUrl(expression);
		// return this.queryUrl(url);
	}

	public queryUrl(url: string) {}
}
