import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';

// import PrivateOutlet from './privateRoute';
// import { Pathname } from './pathname';
import { QueryClient, QueryClientProvider } from 'react-query';


// import Loader from './components/loader';
// import NotFound from './views/404';
// import Login from './views/beforeAuth/login/login';
// import Layout from './layouts/layout/layout';
// import UserAccess from './views/afterAuth/userAccess/userAccess';
// import AirportMasters from './views/afterAuth/airportMasters/airportMasters';
// import GlobalMasters from './views/afterAuth/globalMasters/globalMasters';
// import PlannerAirportMaster from './views/afterAuth/plannerairportMaster/airport';
// import Plans from './views/afterAuth/plans/plans';
// const Dashboard = React.lazy(() => import('./views/afterAuth/dashboard/dashboard'));
// const Orders = React.lazy(() => import('./views/afterAuth/orders/orders'));
// const Components = React.lazy(() => import('./views/beforeAuth/components'));

import Router from "./routes/routes"

import './app.scss';

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
			{/* <Suspense fallback={<Loader />}>
				<Routes>
					<Route
						path="/"
						element={
							token ? (
								userRole === 'admin' ? (
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
							<Route path="orders" element={<Orders />} />

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
			</Suspense> */}
		</QueryClientProvider>
	);
}

export default App;
