import { useContext } from 'react';

import { KurierContext } from '../Kurier';

export function useClient() {
	const client = useContext(KurierContext);

	if (!client) {
		throw new Error('useClient must be used inside Kurier.');
	}

	return client;
}
