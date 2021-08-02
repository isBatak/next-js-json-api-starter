export type SortOrder = 'ascending' | 'descending';

export interface SortSpecifier {
	kind: string;
	order: SortOrder;
}

export interface AttributeSortSpecifier extends SortSpecifier {
	kind: 'attribute';
	attribute: string;
}

export type ComparisonOperator = 'equal' | 'gt' | 'lt' | 'gte' | 'lte';

export interface FilterSpecifier {
	op: ComparisonOperator;
	kind: string;
}

export interface AttributeFilterSpecifier extends FilterSpecifier {
	kind: 'attribute';
	attribute: string;
	value: any;
}

export interface PageSpecifier {
	kind: string;
}

export interface OffsetLimitPageSpecifier extends PageSpecifier {
	kind: 'offsetLimit';
	offset?: number;
	limit?: number;
}

interface QueryExpression {
	op: string;
}

interface IFindRecordsQueryExpression extends QueryExpression {
	op: 'findRecords';
	type: string;
	sort?: Array<SortSpecifier>;
	filter?: Array<FilterSpecifier>;
	page?: PageSpecifier;
}

const chainHandlers = (expression) => ({
	sort: (sort) => {
		const newExpression = {
			...expression,
			sort,
		};
		return chainHandlers(newExpression);
	},

	filter: () => {
		const newExpression = {
			...expression,
		};

		return chainHandlers(newExpression);
	},

	page: () => {
		const newExpression = {
			...expression,
		};

		return chainHandlers(newExpression);
	},
});

function findRecords(type) {
	const expression: IFindRecordsQueryExpression = {
		op: 'findRecords',
		type,
	};

	return {
		expression,
		...chainHandlers(expression),
	};
}

export class QueryBuilder {
	public findRecord() {
		return '';
	}

	public findRecords(type) {
		return findRecords(type);
	}

	public findRelatedRecords = () => {
		return '';
	};
}
