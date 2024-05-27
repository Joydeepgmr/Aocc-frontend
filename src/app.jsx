import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Toaster } from 'react-hot-toast';
import './app.scss';
import Router from './routes/routes';
import socket from './socket/server';
export function App() {
	const token = localStorage.getItem('_tid');
	const userRole = localStorage.getItem('role');
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				retry: false,
			},
		},
	});
	useEffect(() => {
		return () => {
			if (socket.connected) {
				socket.disconnect();
			}
		};
	}, []);

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
		</QueryClientProvider>
	);
}
export { socket };
export default App;
