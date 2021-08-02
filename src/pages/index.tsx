import React from 'react';
import { NextPage } from 'next';
import { Kurier } from '@kurier/react';

import { MainLayout } from '@/components/shared/layouts/MainLayout/MainLayout';
import { TodoListSection } from '@/components/pages/home/TodoListSection/TodoListSection';

const Home: NextPage = () => {
	return (
		<Kurier>
			<MainLayout>
				<TodoListSection />
			</MainLayout>
		</Kurier>
	);
};

export default Home;
