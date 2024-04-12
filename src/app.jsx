import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { io } from 'socket.io-client';

import { Toaster } from 'react-hot-toast';
import './app.scss';
import Router from './routes/routes';

const socket = io(process.env.socketURL);
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
	useEffect(() => {
		socket.on('connect', () => {
			console.log('socket is connected');
		});
		socket.on('connect_error', (error) => {
			console.error('Socket connection error:', error);
		});
		return () => {
			socket.disconnect();
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
