import { createContext } from 'react';

const KurierContext = createContext(null);

export const Kurier = ({ children, snapshot }) => {
	return <KurierContext.Provider value={{}}>{children}</KurierContext.Provider>;
};
