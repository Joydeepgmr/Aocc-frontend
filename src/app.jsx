import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PrivateOutlet from './privateRoute';
import Loader from './components/loader';
import { Pathname } from './pathname';
import Login from './views/beforeAuth/login/login';
import Planning from './views/afterAuth/planning/planning';
import NotFound from './views/404';
import Layout from './layouts/layout/layout';
// import UserAccess from './views/afterAuth/userAccess/userAccess';

import './app.scss';

const Dashboard = React.lazy(() => import('./views/afterAuth/dashboard/dashboard'));
const Orders = React.lazy(() => import('./views/afterAuth/orders/orders'));
const Components = React.lazy(() => import('./views/beforeAuth/components'));

export function App() {
	const token = localStorage.getItem('t_id');

	return (
		<Suspense fallback={<Loader />}>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={token ? <Navigate to={Pathname.DASHBOARD} /> : <Navigate to={Pathname.LOGIN} />}
					/>
					<Route path={Pathname.LOGIN} element={<Login />} />

					<Route path={Pathname.DASHBOARD} element={<PrivateOutlet />}>
						<Route element={<Layout />}>
							<Route index element={<Dashboard />} />
							<Route path="orders" element={<Orders />} />
							<Route path="*" element={<NotFound />} />
						</Route>
					</Route>
					{/* <Route path={Pathname.USERACCESS} element={<PrivateOutlet />}>
						<Route element={<Layout />}>
							<Route index element={<UserAccess />} />
						</Route>
					</Route> */}
					<Route path={Pathname.COMPONENTS} element={<Components />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</Suspense>
	);
}

export default App;
