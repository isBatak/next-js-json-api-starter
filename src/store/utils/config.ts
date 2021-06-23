import { config, CachingStrategy, IRawResponse, ICollectionFetchOpts } from '@datx/jsonapi';
import { apify, deapify } from '@datx/jsonapi-react';

config.cache = CachingStrategy.NetworkOnly;

console.log(process.env.NEXT_PUBLIC_SITE_URL);

config.baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/kurier/`;

config.transformResponse = (opts: IRawResponse) => {
	return { ...opts, data: deapify(opts.data) };
};

config.transformRequest = (opts: ICollectionFetchOpts) => {
	return { ...opts, data: apify(opts.data) };
};
