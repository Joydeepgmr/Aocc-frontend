import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from "./routes/routes"

import './app.scss';

export function App() {
	const token = localStorage.getItem('_tid');
	console.log('What is token here:', token);
	const userRole = localStorage.getItem('role');
	console.log('what is the role in app.jsx', userRole);

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				retry: false,
			},
		},
	});
	return (
		<QueryClientProvider client={queryClient}>
			<Router />
		</QueryClientProvider>
	);
}

export default App;
