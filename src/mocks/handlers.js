import { rest } from 'msw';

export const handlers = [
	rest.get('/api/kurier/todo', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				username: 'admin',
			})
		);
	}),
];
