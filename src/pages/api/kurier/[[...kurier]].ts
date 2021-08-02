import { Application, jsonApiVercel } from 'kurier';
import { knex } from 'knex';
import type { NextApiRequest, NextApiResponse } from 'next';

import config from '../../../../knexfile.js';

import { Todo } from '@/resources/Todo';

const app = new Application({
	namespace: 'api/kurier',
	types: [Todo],
});

// You can also add a database connection with Knex.
app.services.knex = knex(config);

// Export the middleware result so Next.js can handle Kurier endpoints.
export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.headers['content-type'] === 'application/vnd.api+json' && req.body) {
		req.body = JSON.parse(req.body);
	}

	// @ts-ignore
	await jsonApiVercel(app)(req, res);
};
