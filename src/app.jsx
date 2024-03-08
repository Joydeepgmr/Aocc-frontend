import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PrivateOutlet from './privateRoute';
import Loader from './components/loader';
import { Pathname } from './pathname';
import Login from './views/beforeAuth/login/login';
import NotFound from './views/404';
import Layout from './layouts/layout/layout';
import UserAccess from './views/afterAuth/userAccess/userAccess';

import './app.scss';
import GlobalMasters from './views/afterAuth/globalMasters/globalMasters';

const Dashboard = React.lazy(() => import('./views/afterAuth/dashboard/dashboard'));
const Orders = React.lazy(() => import('./views/afterAuth/orders/orders'));
const Components = React.lazy(() => import('./views/beforeAuth/components'));

export function App() {
	const token = localStorage.getItem('t_id');
	const role = 'ITAdmin';

	return (
		<Suspense fallback={<Loader />}>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							token ? (
								role === 'ITAdmin' ? (
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
					<Route path={Pathname.USERACCESS} element={<PrivateOutlet />}>
						<Route element={<Layout />}>
							<Route index element={<UserAccess />} />
						</Route>
					</Route>
					<Route path={Pathname.GLOBALMASTERS} element={<PrivateOutlet />}>
						<Route element={<Layout />}>
							<Route index element={<GlobalMasters />} />
						</Route>
					</Route>
					<Route path={Pathname.AIRPORTMASTERS} element={<PrivateOutlet />}>
						<Route element={<Layout />}>
							<Route index element={<NotFound />} />
						</Route>
					</Route>
					<Route path={Pathname.COMPONENTS} element={<Components />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</Suspense>
	);
}

export default App;
