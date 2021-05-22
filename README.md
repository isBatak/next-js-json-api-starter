# Next.js JSON:API starter

## Technology

- [Next.js](https://nextjs.org/)
- [Kurier](https://kurier.readthedocs.io/en/latest/)
- [Datx](https://datx.dev/)
- [SWR](https://swr.vercel.app/)
- [Chakra UI](https://chakra-ui.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Hook Form](https://react-hook-form.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) and [Jest](https://jestjs.io/) for unit and integration tests
- [Storybook](https://storybook.js.org/)
- [I18Next](https://www.i18next.com/)
- [Hygen Templates](https://www.hygen.io/)

## Frontend development setup

```bash
# Install dependencies
yarn install

# Start the dev server
yarn dev
```

## API development setup

```bash
# Run migrations
cd ./api
npx knex migrate:latest
cs ..

# Start the dev server
yarn api:dev
```
