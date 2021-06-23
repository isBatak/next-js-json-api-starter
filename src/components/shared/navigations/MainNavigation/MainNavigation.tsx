import React, { FC } from 'react';
import { Box, Flex, Link, useColorMode, IconButton, Button, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import NextLink from 'next/link';

import { NavigationWrapper } from './MainNavigation.elements';

import MoonIcon from '@/assets/icons/ic-moon.svg';
import SunIcon from '@/assets/icons/ic-sun.svg';

export const MainNavigation: FC = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<NavigationWrapper>
			<Flex justifyContent="space-between" alignItems="center">
				<LinkBox>
					<NextLink href="/" passHref>
						<Link>
							<Heading as="span" size="lg">
								Todo
							</Heading>
						</Link>
					</NextLink>
				</LinkBox>
				<Box>
					<Button disabled mr={2}>
						Logout
					</Button>
					<IconButton
						aria-label="Toggle color mode"
						onClick={toggleColorMode}
						icon={<Box w="16px" as={colorMode === 'light' ? MoonIcon : SunIcon} />}
					/>
				</Box>
			</Flex>
		</NavigationWrapper>
	);
};
