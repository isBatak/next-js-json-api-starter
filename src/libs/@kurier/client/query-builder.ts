import {
	FindRecordQueryExpression,
	FindRecordsQueryExpression,
	FindRelatedRecordQueryExpression,
	FindRelatedRecordsQueryExpression,
	RecordIdentity,
} from './types';

const scope = (expression) => {
	return {
		expression,
		sort: (sort) => {
			const newExpression = {
				...expression,
				sort,
			};
			return scope(newExpression);
		},

		filter: () => {
			const newExpression = {
				...expression,
			};

			return scope(newExpression);
		},

		page: () => {
			const newExpression = {
				...expression,
			};

			return scope(newExpression);
		},
	};
};

export function findRecord(record: RecordIdentity) {
	const expression: FindRecordQueryExpression = {
		op: 'findRecord',
		record,
	};

	return {
		expression,
	};
}

export function findRecords(type: string) {
	const expression: FindRecordsQueryExpression = {
		op: 'findRecords',
		type,
	};

	return scope(expression);
}

export function findRelatedRecord(record: RecordIdentity, relationship: string) {
	const expression: FindRelatedRecordQueryExpression = {
		op: 'findRelatedRecord',
		record,
		relationship,
	};

	return {
		expression,
	};
}

export function findRelatedRecords(record: RecordIdentity, relationship: string) {
	const expression: FindRelatedRecordsQueryExpression = {
		op: 'findRelatedRecords',
		record,
		relationship,
	};

	return {
		expression,
	};
}

export const QueryBuilder = {
	findRecord,
	findRecords,
	findRelatedRecord,
	findRelatedRecords,
};
