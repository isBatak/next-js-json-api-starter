interface IClientSettings<S> {
	store?: S;
}

const Client = <S>({ store }: IClientSettings<S>) => {
	return;
};

export default Client;
