import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PrivateOutlet from './privateRoute';
import Loader from './components/loader';
import { Pathname } from './pathname';
import Landing from './views/beforeAuth/landing/landing';
import Login from './views/beforeAuth/login/index';

import './app.scss';

const Dashboard = React.lazy(() => import('./views/afterAuth/dashboard/dashboard'));
const Orders = React.lazy(() => import('./views/afterAuth/orders/orders'));
const Components = React.lazy(() => import('./views/beforeAuth/components'));
const NotFound = React.lazy(() => import('./views/404'));

export function App() {
	return (
		<Suspense fallback={<Loader />}>
			<BrowserRouter>
				<Routes>
					<Route path={Pathname.LOGIN} element={<Login />} />
					<Route index path={Pathname.LANDING_PAGE} element={<Landing />} />
					<Route path={Pathname.DASHBOARD} element={<PrivateOutlet />}>
						<Route index element={<Dashboard />} />
						<Route path="orders" element={<Orders />} />
						<Route path="*" element={<NotFound />} />
					</Route>
					<Route path={Pathname.COMPONENTS} element={<Components />} />
					<Route path="*" component={NotFound} />
				</Routes>
			</BrowserRouter>
		</Suspense>
	);
}

export default App;
