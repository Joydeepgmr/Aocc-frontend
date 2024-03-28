import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import * as userType from './utils/roles';
import PrivateOutlet from './privateRoute';
import Loader from './components/loader';
import { Pathname } from './pathname';
import Login from './views/beforeAuth/login/login';
import NotFound from './views/404';
import Layout from './layouts/layout/layout';
import UserAccess from './views/afterAuth/userAccess/userAccess';
import AirportMasters from './views/afterAuth/airportMasters/airportMasters';
import GlobalMasters from './views/afterAuth/globalMasters/globalMasters';
import PlannerAirportMaster from './views/afterAuth/plannerairportMaster/airport';
import Plans from './views/afterAuth/plans/plans';
const Dashboard = React.lazy(() => import('./views/afterAuth/dashboard/dashboard'));
const Components = React.lazy(() => import('./views/beforeAuth/components'));

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
			<Suspense fallback={<Loader />}>
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
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={
								token ? (
									userRole === userType.IT_ADMIN ? (
										<Navigate to={Pathname.GLOBALMASTERS} />
									) : (
										<Navigate to={Pathname.DASHBOARD} />
									)
								) : (
									<Navigate to={Pathname.LOGIN} />
								)
							}
						/>
						<Route path={Pathname.LOGIN} element={<Login />} />

						<Route path={Pathname.DASHBOARD} element={<PrivateOutlet />}>
							<Route element={<Layout />}>
								<Route index element={<Dashboard />} />
								<Route path="*" element={<NotFound />} />
							</Route>
						</Route>
						<Route path={Pathname.PLAN} element={<PrivateOutlet />}>
							<Route element={<Layout />}>
								<Route index element={<Plans />} />
								<Route path="*" element={<NotFound />} />
							</Route>
						</Route>
						<Route path={Pathname.USERACCESS} element={<PrivateOutlet />}>
							<Route element={<Layout />}>
								<Route index element={<UserAccess />} />
							</Route>
						</Route>
						<Route path={Pathname.PLANAIRPORTMASTER} element={<PrivateOutlet />}>
							<Route element={<Layout />}>
								<Route index element={<PlannerAirportMaster />} />
							</Route>
						</Route>
						<Route path={Pathname.GLOBALMASTERS} element={<PrivateOutlet />}>
							<Route element={<Layout />}>
								<Route index element={<GlobalMasters />} />
							</Route>
						</Route>
						<Route path={Pathname.AIRPORTMASTERS} element={<PrivateOutlet />}>
							<Route element={<Layout />}>
								<Route index element={<AirportMasters />} />
							</Route>
						</Route>
						<Route path={Pathname.COMPONENTS} element={<Components />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</Suspense>
		</QueryClientProvider>
	);
}

export default App;
