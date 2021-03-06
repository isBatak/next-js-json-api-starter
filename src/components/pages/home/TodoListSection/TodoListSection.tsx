import React, { FC, Fragment } from 'react';
import { Box, Container, Divider, Heading, IconButton } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useResourceList } from '@datx/jsonapi-react';

import { Todo } from '@/resources/Todo';
import { TodoList } from '@/components/shared/todo/TodoList/TodoList';
import { LoadingMessage } from '@/components/shared/messages/LoadingMessage/LoadingMessage';
import { EmptyListMessage } from '@/components/shared/messages/EmptyListMessage/EmptyListMessage';

import PlusIcon from '@/assets/icons/ic-plus.svg';
import { BasicPagination } from '@/components/shared/paginations/BasicPagination/BasicPagination';

export const TodoListSection: FC = () => {
	const { data, error, hasNext, hasPrev, next, prev } = useResourceList(() => [
		Todo,
		// {
		// 	queryParams: {
		// 		custom: [
		// 			{ key: 'page[size]', value: '3' },
		// 			{ key: 'page[number]', value: '0' },
		// 		],
		// 	},
		// },
	]);

	if (error) {
		throw error;
	}

	if (!data) {
		return <LoadingMessage />;
	}

	return (
		<Container>
			<Box as="section">
				<Heading as="h1" my={10}>
					Todo list
					<NextLink href="/todo/new/edit" passHref>
						<IconButton ml={8} aria-label="Create new todo" icon={<Box width="16px" as={PlusIcon} />} />
					</NextLink>
				</Heading>

				<Divider mb={10} />
				{data.length > 0 ? (
					<Fragment>
						<TodoList todoList={data} />
						<BasicPagination hasNext={hasNext} hasPrev={hasPrev} onNext={next} onPrev={prev} current={1} total={10} />
					</Fragment>
				) : (
					<EmptyListMessage />
				)}
			</Box>
		</Container>
	);
};
