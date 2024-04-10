import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { io } from 'socket.io-client';

import { Toaster } from 'react-hot-toast';
import './app.scss';
import Router from './routes/routes';

const socket = io('https://57c4-2401-4900-1c55-4805-6d91-ecf9-4fc3-4c9d.ngrok-free.app');
export function App() {
	const [socketError, setSocketError] = useState('');
	const [socketConnected, setSocketConnected] = useState(false);
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
			console.log('Socket connected');
			setSocketConnected(true);
		});

		socket.on('connect_error', (error) => {
			console.error('Socket connection error:', error);
			setSocketError(error);
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
