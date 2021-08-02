import useSWR from 'swr';

import { useClient } from './use-client';

export function useQuery(queryCallback: (queryBuilder) => any, config?: any) {
	const client = useClient();

	return useSWR(() => client.prepareQuery(queryCallback), client.query, config);
}
