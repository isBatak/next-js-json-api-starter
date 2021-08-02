export class Store {
	private collection = new Map();

	constructor({ snapshot } = {}) {
		console.log(snapshot);
	}

	public get(key: string) {}

	public set(key: string) {}
}
