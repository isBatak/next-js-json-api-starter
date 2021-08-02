import React, { ReactElement } from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '../styles/theme';
import { Fonts } from '../styles/Fonts';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
	require('../mocks');
}

function MyApp({ Component, pageProps }: AppProps): ReactElement {
	return (
		<ChakraProvider theme={theme}>
			<Fonts />
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
