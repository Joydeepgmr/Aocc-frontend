import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { io } from 'socket.io-client';

import { Toaster } from 'react-hot-toast';
import './app.scss';
import Router from './routes/routes';

const socketUrl = process.env.baseURL.split('/').slice(0, 3).join('/');
const socket = io(socketUrl, { timeout: 10000, transports: ['websocket'] });
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
		socket.on('connect', () => {
			console.log('socket is connected');
		});
		socket.on('connect_error', (error) => {
			console.error('Socket connection error:', error);
		});
		socket.on('UPDATE_API', (data) => console.log('Socket is listing...'));
		socket.on('disconnect', (reason) => {
			console.log(reason);
		});
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
