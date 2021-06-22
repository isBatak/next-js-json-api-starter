import { Application, jsonApiVercel } from 'kurier';
import { knex } from 'knex';
import type { NextApiRequest, NextApiResponse } from 'next';

import Todo from '@/kurier/resources/todo';

const app = new Application({
	namespace: 'api/kurier',
	types: [Todo],
});

// You can also add a database connection with Knex.
app.services.knex = knex({
	client: 'pg',
	connection: 'postgres://postgres:uBYNkja4QjR7L9V@db.osbuycvzriprmjnoehzm.supabase.co:5432/postgres',
	useNullAsDefault: true,
	debug: true,
});

// Export the middleware result so Next.js can handle Kurier endpoints.
export default (req: NextApiRequest, res: NextApiResponse) => {
	if (req.body) {
		req.body = JSON.parse(req.body);
	}

	jsonApiVercel(app)(req, res);
};
