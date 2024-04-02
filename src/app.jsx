import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from "./routes/routes"

import './app.scss';
import { Toaster } from 'react-hot-toast';

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
			<Toaster
				position="top-center"
				gutter={8}
				toastOptions={{
					style: {
						background: '#363636',
						color: '#fff',
						fontSize: '1.3rem',
					},
					success: {
						duration: 3000,
					},
					error: {
						duration: 5000,
					},
				}}
			/>
			<Router />
		</QueryClientProvider >
	);
}

export default App;
