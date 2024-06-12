import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Toaster } from 'react-hot-toast';
import './app.scss';
import Router from './routes/routes';
import { useSocket } from './socket/socketContext';
export function App() {
	const socket = useSocket();
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				retry: false,
			},
		},
	});

	useEffect(() => {
		socket.connect();
		socket.on('connect', () => {
			console.log('socket is connected');
		});
		socket.on('UPDATE_API', () => console.log('socket is listing'));
		return () => {
			socket.off('connect');
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
export default App;
