export interface RecordIdentity {
	type: string;
	id: string;
}

export interface QueryExpression {
	op: string;
}

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

export interface FindRecordQueryExpression extends QueryExpression {
	op: 'findRecord';
	record: RecordIdentity;
}

export interface FindRecordsQueryExpression extends QueryExpression {
	op: 'findRecords';
	type: string;
	sort?: Array<SortSpecifier>;
	filter?: Array<FilterSpecifier>;
	page?: PageSpecifier;
}

export interface FindRelatedRecordQueryExpression extends QueryExpression {
	op: 'findRelatedRecord';
	record: RecordIdentity;
	relationship: string;
}

export interface FindRelatedRecordsQueryExpression extends QueryExpression {
	op: 'findRelatedRecords';
	record: RecordIdentity;
	relationship: string;
	sort?: SortSpecifier[];
	filter?: FilterSpecifier[];
	page?: PageSpecifier;
}
