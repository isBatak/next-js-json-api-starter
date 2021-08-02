import { createContext, FC } from 'react';
import { Client } from '@kurier/client';
import { Store } from '@kurier/store';

export const KurierContext = createContext<any>(null);

export interface IKurierProps {
	snapshot?: any;
}

export const Kurier: FC<IKurierProps> = ({ children, snapshot }) => {
	const client = new Client({ store: new Store(snapshot) });

	return <KurierContext.Provider value={client}>{children}</KurierContext.Provider>;
};
