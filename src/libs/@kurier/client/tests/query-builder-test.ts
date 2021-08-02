import { QueryBuilder } from '../query-builder';

describe('QueryBuilder', () => {
	const qb = QueryBuilder;

	it('findRecord', () => {
		expect(qb.findRecord({ type: 'planet', id: '123' }).expression).toEqual({
			op: 'findRecord',
			record: {
				type: 'planet',
				id: '123',
			},
		});
	});

	it('findRecord + options', () => {
		expect(qb.findRecord({ type: 'planet', id: '123' }).options({ url: '/test' }).expression).toEqual({
			op: 'findRecord',
			options: {
				url: '/test',
			},
			record: {
				type: 'planet',
				id: '123',
			},
		});
	});

	it('findRecord + merged options', () => {
		expect(
			qb
				.findRecord({ type: 'planet', id: '123' })
				.options({ source: { remote: { url: '/test' } } })
				.options({ source: { remote: { reload: true } } }).expression
		).toEqual({
			op: 'findRecord',
			options: {
				source: {
					remote: {
						url: '/test',
						reload: true,
					},
				},
			},
			record: {
				type: 'planet',
				id: '123',
			},
		});
	});

	it('findRecords by type', () => {
		expect(qb.findRecords('planet').expression).toEqual({
			op: 'findRecords',
			type: 'planet',
		});
	});

	it('findRecords by identities', () => {
		expect(
			qb.findRecords([
				{ type: 'planet', id: 'earth' },
				{ type: 'planet', id: 'mars' },
			]).expression
		).toEqual({
			op: 'findRecords',
			records: [
				{ type: 'planet', id: 'earth' },
				{ type: 'planet', id: 'mars' },
			],
		});
	});

	it('findRecords + options', () => {
		expect(qb.findRecords('planet').options({ url: '/test' }).expression).toEqual({
			op: 'findRecords',
			type: 'planet',
			options: { url: '/test' },
		});
	});

	it('findRecords + attribute filter', () => {
		expect(qb.findRecords('planet').filter({ attribute: 'name', value: 'Pluto' }).expression).toEqual({
			op: 'findRecords',
			type: 'planet',
			filter: [
				{
					op: 'equal',
					kind: 'attribute',
					attribute: 'name',
					value: 'Pluto',
				},
			],
		});
	});

	it('findRecords + attribute filters', () => {
		expect(
			qb
				.findRecords('planet')
				.filter({ attribute: 'atmosphere', value: true }, { attribute: 'classification', value: 'terrestrial' })
				.expression
		).toEqual({
			op: 'findRecords',
			type: 'planet',
			filter: [
				{
					op: 'equal',
					kind: 'attribute',
					attribute: 'atmosphere',
					value: true,
				},
				{
					op: 'equal',
					kind: 'attribute',
					attribute: 'classification',
					value: 'terrestrial',
				},
			],
		});
	});

	it('findRecords + filter (invalid filter expression)', () => {
		expect(() => qb.findRecords('planet').filter({ name: 'Pluto' }).expression).toThrow(
			new Error('Unrecognized `filter` param encountered while building query expression')
		);
	});

	it('findRecords + attribute filter', () => {
		expect(qb.findRecords('planet').filter({ attribute: 'name', value: 'Pluto' }).expression).toEqual({
			op: 'findRecords',
			type: 'planet',
			filter: [
				{
					op: 'equal',
					kind: 'attribute',
					attribute: 'name',
					value: 'Pluto',
				},
			],
		});
	});

	it('findRecords + hasOne filter', () => {
		expect(qb.findRecords('planet').filter({ relation: 'star', record: { id: '1', type: 'star' } }).expression).toEqual(
			{
				op: 'findRecords',
				type: 'planet',
				filter: [
					{
						op: 'equal',
						kind: 'relatedRecord',
						relation: 'star',
						record: { id: '1', type: 'star' },
					},
				],
			}
		);
	});

	it('findRecords + hasMany filter', () => {
		expect(
			qb.findRecords('planet').filter({
				relation: 'moons',
				records: [
					{ id: '1', type: 'moon' },
					{ id: '2', type: 'moon' },
				],
				op: 'equal',
			}).expression
		).toEqual({
			op: 'findRecords',
			type: 'planet',
			filter: [
				{
					op: 'equal',
					kind: 'relatedRecords',
					relation: 'moons',
					records: [
						{ id: '1', type: 'moon' },
						{ id: '2', type: 'moon' },
					],
				},
			],
		});
	});

	it('findRecords + sort (one field, compact)', () => {
		expect(qb.findRecords('planet').sort('name').expression).toEqual({
			op: 'findRecords',
			type: 'planet',
			sort: [
				{
					kind: 'attribute',
					attribute: 'name',
					order: 'ascending',
				},
			],
		});
	});

	it('findRecords + sort (one field descending, compact)', () => {
		expect(qb.findRecords('planet').sort('-name').expression).toEqual({
			op: 'findRecords',
			type: 'planet',
			sort: [
				{
					kind: 'attribute',
					attribute: 'name',
					order: 'descending',
				},
			],
		});
	});

	it('findRecords + sort (multiple fields, compact)', () => {
		expect(qb.findRecords('planet').sort('name', 'age').expression).toEqual({
			op: 'findRecords',
			type: 'planet',
			sort: [
				{
					kind: 'attribute',
					attribute: 'name',
					order: 'ascending',
				},
				{
					kind: 'attribute',
					attribute: 'age',
					order: 'ascending',
				},
			],
		});
	});

	it('findRecords + sort (one field, verbose)', () => {
		expect(qb.findRecords('planet').sort({ attribute: 'name' }).expression).toEqual({
			op: 'findRecords',
			type: 'planet',
			sort: [
				{
					kind: 'attribute',
					attribute: 'name',
					order: 'ascending',
				},
			],
		});
	});

	it('findRecords + sort (one field, specified order, verbose)', () => {
		expect(qb.findRecords('planet').sort({ attribute: 'name', order: 'ascending' }).expression).toEqual({
			op: 'findRecords',
			type: 'planet',
			sort: [
				{
					kind: 'attribute',
					attribute: 'name',
					order: 'ascending',
				},
			],
		});
	});

	it('findRecords + sort (one field, specified order, verbose)', () => {
		expect(
			qb
				.findRecords('planet')
				.sort({ attribute: 'name', order: 'ascending' }, { attribute: 'age', order: 'descending' }).expression
		).toEqual({
			op: 'findRecords',
			type: 'planet',
			sort: [
				{
					kind: 'attribute',
					attribute: 'name',
					order: 'ascending',
				},
				{
					kind: 'attribute',
					attribute: 'age',
					order: 'descending',
				},
			],
		});
	});

	it('findRecords + sort (invalid sort expression)', () => {
		expect(() => qb.findRecords('planet').sort(null as any)).toThrow(
			new Error('Unrecognized `sort` param encountered while building query expression')
		);
	});

	it('findRecords + page', () => {
		expect(qb.findRecords('planet').page({ offset: 1, limit: 10 }).expression).toEqual({
			op: 'findRecords',
			type: 'planet',
			page: {
				kind: 'offsetLimit',
				offset: 1,
				limit: 10,
			},
		});
	});

	it('findRecords + filter + sort + page', () => {
		expect(
			qb
				.findRecords('planet')
				.filter({ attribute: 'name', value: 'Jupiter' }, { attribute: 'age', value: 23000000 })
				.page({ offset: 1, limit: 10 })
				.sort('-name').expression
		).toEqual({
			op: 'findRecords',
			type: 'planet',
			filter: [
				{
					op: 'equal',
					kind: 'attribute',
					attribute: 'name',
					value: 'Jupiter',
				},
				{
					op: 'equal',
					kind: 'attribute',
					attribute: 'age',
					value: 23000000,
				},
			],
			page: {
				kind: 'offsetLimit',
				offset: 1,
				limit: 10,
			},
			sort: [
				{
					kind: 'attribute',
					attribute: 'name',
					order: 'descending',
				},
			],
		});
	});

	it('findRelatedRecord', () => {
		expect(qb.findRelatedRecord({ type: 'moon', id: '123' }, 'planet').expression).toEqual({
			op: 'findRelatedRecord',
			record: {
				id: '123',
				type: 'moon',
			},
			relationship: 'planet',
		});
	});

	it('findRelatedRecord + options', () => {
		expect(qb.findRelatedRecord({ type: 'moon', id: '123' }, 'planet').options({ url: '/test' }).expression).toEqual({
			op: 'findRelatedRecord',
			record: {
				id: '123',
				type: 'moon',
			},
			relationship: 'planet',
			options: { url: '/test' },
		});
	});

	it('findRelatedRecords', () => {
		expect(qb.findRelatedRecords({ type: 'planet', id: '123' }, 'moons').expression).toEqual({
			op: 'findRelatedRecords',
			record: {
				id: '123',
				type: 'planet',
			},
			relationship: 'moons',
		});
	});

	it('findRelatedRecords + options', () => {
		expect(qb.findRelatedRecords({ type: 'planet', id: '123' }, 'moons').options({ url: '/test' }).expression).toEqual({
			op: 'findRelatedRecords',
			record: {
				id: '123',
				type: 'planet',
			},
			relationship: 'moons',
			options: { url: '/test' },
		});
	});

	it('findRelatedRecords + attribute filter', () => {
		expect(
			qb.findRelatedRecords({ type: 'planet', id: '123' }, 'moons').filter({
				attribute: 'name',
				value: 'Pluto',
			}).expression
		).toEqual({
			op: 'findRelatedRecords',
			record: {
				id: '123',
				type: 'planet',
			},
			relationship: 'moons',
			filter: [
				{
					op: 'equal',
					kind: 'attribute',
					attribute: 'name',
					value: 'Pluto',
				},
			],
		});
	});

	it('findRelatedRecords + attribute filters', () => {
		expect(
			qb
				.findRelatedRecords({ type: 'planet', id: '123' }, 'moons')
				.filter({ attribute: 'atmosphere', value: true }, { attribute: 'classification', value: 'terrestrial' })
				.expression
		).toEqual({
			op: 'findRelatedRecords',
			record: {
				id: '123',
				type: 'planet',
			},
			relationship: 'moons',
			filter: [
				{
					op: 'equal',
					kind: 'attribute',
					attribute: 'atmosphere',
					value: true,
				},
				{
					op: 'equal',
					kind: 'attribute',
					attribute: 'classification',
					value: 'terrestrial',
				},
			],
		});
	});

	it('findRelatedRecords + filter (invalid filter expression)', () => {
		expect(
			() => qb.findRelatedRecords({ type: 'planet', id: '123' }, 'moons').filter({ name: 'Pluto' }).expression
		).toThrow(new Error('Unrecognized `filter` param encountered while building query expression'));
	});

	it('findRelatedRecords + attribute filter', () => {
		expect(
			qb.findRelatedRecords({ type: 'planet', id: '123' }, 'moons').filter({
				attribute: 'name',
				value: 'Pluto',
			}).expression
		).toEqual({
			op: 'findRelatedRecords',
			record: {
				id: '123',
				type: 'planet',
			},
			relationship: 'moons',
			filter: [
				{
					op: 'equal',
					kind: 'attribute',
					attribute: 'name',
					value: 'Pluto',
				},
			],
		});
	});

	it('findRelatedRecords + hasOne filter', () => {
		expect(
			qb.findRelatedRecords({ type: 'planet', id: '123' }, 'moons').filter({
				relation: 'star',
				record: { id: '1', type: 'star' },
			}).expression
		).toEqual({
			op: 'findRelatedRecords',
			record: {
				id: '123',
				type: 'planet',
			},
			relationship: 'moons',
			filter: [
				{
					op: 'equal',
					kind: 'relatedRecord',
					relation: 'star',
					record: { id: '1', type: 'star' },
				},
			],
		});
	});

	it('findRelatedRecords + hasMany filter', () => {
		expect(
			qb.findRelatedRecords({ type: 'planet', id: '123' }, 'moons').filter({
				relation: 'moons',
				records: [
					{ id: '1', type: 'moon' },
					{ id: '2', type: 'moon' },
				],
				op: 'equal',
			}).expression
		).toEqual({
			op: 'findRelatedRecords',
			record: {
				id: '123',
				type: 'planet',
			},
			relationship: 'moons',
			filter: [
				{
					op: 'equal',
					kind: 'relatedRecords',
					relation: 'moons',
					records: [
						{ id: '1', type: 'moon' },
						{ id: '2', type: 'moon' },
					],
				},
			],
		});
	});

	it('findRelatedRecords + sort (one field, compact)', () => {
		expect(qb.findRelatedRecords({ type: 'planet', id: '123' }, 'moons').sort('name').expression).toEqual({
			op: 'findRelatedRecords',
			record: {
				id: '123',
				type: 'planet',
			},
			relationship: 'moons',
			sort: [
				{
					kind: 'attribute',
					attribute: 'name',
					order: 'ascending',
				},
			],
		});
	});

	it('findRelatedRecords + sort (one field descending, compact)', () => {
		expect(qb.findRelatedRecords({ type: 'planet', id: '123' }, 'moons').sort('-name').expression).toEqual({
			op: 'findRelatedRecords',
			record: {
				id: '123',
				type: 'planet',
			},
			relationship: 'moons',
			sort: [
				{
					kind: 'attribute',
					attribute: 'name',
					order: 'descending',
				},
			],
		});
	});

	it('findRelatedRecords + sort (multiple fields, compact)', () => {
		expect(qb.findRelatedRecords({ type: 'planet', id: '123' }, 'moons').sort('name', 'age').expression).toEqual({
			op: 'findRelatedRecords',
			record: {
				id: '123',
				type: 'planet',
			},
			relationship: 'moons',
			sort: [
				{
					kind: 'attribute',
					attribute: 'name',
					order: 'ascending',
				},
				{
					kind: 'attribute',
					attribute: 'age',
					order: 'ascending',
				},
			],
		});
	});

	it('findRelatedRecords + sort (one field, verbose)', () => {
		expect(
			qb.findRelatedRecords({ type: 'planet', id: '123' }, 'moons').sort({ attribute: 'name' }).expression
		).toEqual({
			op: 'findRelatedRecords',
			record: {
				id: '123',
				type: 'planet',
			},
			relationship: 'moons',
			sort: [
				{
					kind: 'attribute',
					attribute: 'name',
					order: 'ascending',
				},
			],
		});
	});

	it('findRelatedRecords + sort (one field, specified order, verbose)', () => {
		expect(
			qb.findRelatedRecords({ type: 'planet', id: '123' }, 'moons').sort({
				attribute: 'name',
				order: 'ascending',
			}).expression
		).toEqual({
			op: 'findRelatedRecords',
			record: {
				id: '123',
				type: 'planet',
			},
			relationship: 'moons',
			sort: [
				{
					kind: 'attribute',
					attribute: 'name',
					order: 'ascending',
				},
			],
		});
	});

	it('findRelatedRecords + sort (one field, specified order, verbose)', () => {
		expect(
			qb
				.findRelatedRecords({ type: 'planet', id: '123' }, 'moons')
				.sort({ attribute: 'name', order: 'ascending' }, { attribute: 'age', order: 'descending' }).expression
		).toEqual({
			op: 'findRelatedRecords',
			record: {
				id: '123',
				type: 'planet',
			},
			relationship: 'moons',
			sort: [
				{
					kind: 'attribute',
					attribute: 'name',
					order: 'ascending',
				},
				{
					kind: 'attribute',
					attribute: 'age',
					order: 'descending',
				},
			],
		});
	});

	it('findRelatedRecords + sort (invalid sort expression)', () => {
		expect(() => qb.findRelatedRecords({ type: 'planet', id: '123' }, 'moons').sort(null as any)).toThrow(
			new Error('Unrecognized `sort` param encountered while building query expression')
		);
	});

	it('findRelatedRecords + page', () => {
		expect(
			qb.findRelatedRecords({ type: 'planet', id: '123' }, 'moons').page({ offset: 1, limit: 10 }).expression
		).toEqual({
			op: 'findRelatedRecords',
			record: {
				id: '123',
				type: 'planet',
			},
			relationship: 'moons',
			page: {
				kind: 'offsetLimit',
				offset: 1,
				limit: 10,
			},
		});
	});

	it('findRelatedRecords + filter + sort + page', () => {
		expect(
			qb
				.findRelatedRecords({ type: 'planet', id: '123' }, 'moons')
				.filter({ attribute: 'name', value: 'Jupiter' }, { attribute: 'age', value: 23000000 })
				.page({ offset: 1, limit: 10 })
				.sort('-name').expression
		).toEqual({
			op: 'findRelatedRecords',
			record: {
				id: '123',
				type: 'planet',
			},
			relationship: 'moons',
			filter: [
				{
					op: 'equal',
					kind: 'attribute',
					attribute: 'name',
					value: 'Jupiter',
				},
				{
					op: 'equal',
					kind: 'attribute',
					attribute: 'age',
					value: 23000000,
				},
			],
			page: {
				kind: 'offsetLimit',
				offset: 1,
				limit: 10,
			},
			sort: [
				{
					kind: 'attribute',
					attribute: 'name',
					order: 'descending',
				},
			],
		});
	});
});
