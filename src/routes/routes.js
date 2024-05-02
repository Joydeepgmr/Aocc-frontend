import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import { Pathname } from '../pathname';
import PrivateOutlet from '../privateRoute';

import Loader from '../components/loader';
import Layout from '../layouts/layout/layout';
import NotFound from '../views/404';
import AirportMasters from '../views/afterAuth/airportMasters/airportMasters';
import Dashboard from '../views/afterAuth/dashboard/dashboard';
import GlobalMasters from '../views/afterAuth/globalMasters/globalMasters';
import PlannerAirportMaster from '../views/afterAuth/plannerairportMaster/airport';
import Plans from '../views/afterAuth/plans/plans';
import UserAccess from '../views/afterAuth/userAccess/userAccess';
import Components from '../views/beforeAuth/components';
import Login from '../views/beforeAuth/login/login';
import SecurityApproval from '../views/afterAuth/securityApproval/securityApproval';
import CDM from '../views/afterAuth/cdm/cdm';
import Vendor from '../views/afterAuth/Vendor/Vendor';
import FidsDashboard from '../views/afterAuth/fids/fidsDashboard/fidsDashboard';
import FidsResources from '../views/afterAuth/fids/fidsResources/fidsResources';
import DashboardCharts from '../views/afterAuth/dashboardCharts/dashboardCharts';

// ----------------------------------------------------------------------

const RouteHOC = (props) => {
	return <Layout>{props.element}</Layout>;
};

export default function Router() {
	const routes = useRoutes([
		{
			errorElement: <NotFound />,
			children: [
				{
					path: Pathname.LOGIN,
					element: <Login />,
				},
				{
					path: Pathname.COMPONENTS,
					element: <Components />,
				},
				{
					path: '',
					element: (
						<Suspense fallback={<Loader />}>
							<PrivateOutlet />
						</Suspense>
					),
					children: [
						{ path: Pathname.GLOBALMASTERS, element: <RouteHOC element={<GlobalMasters />} /> },
						{ path: Pathname.AIRPORTMASTERS, element: <RouteHOC element={<AirportMasters />} /> },
					],
				},
				{
					path: '',
					element: (
						<Suspense fallback={<Loader />}>
							<PrivateOutlet />
						</Suspense>
					),
					children: [
						{ path: Pathname.DASHBOARD, element: <RouteHOC element={<Dashboard />} />, index: true },
						{ path: Pathname.PLANAIRPORTMASTER, element: <RouteHOC element={<PlannerAirportMaster />} /> },
						{ path: Pathname.USERACCESS, element: <RouteHOC element={<UserAccess />} /> },
						{ path: Pathname.PLAN, element: <RouteHOC element={<Plans />} /> },
						{ path: Pathname.CDM, element: <RouteHOC element={<CDM />} /> },
						{ path: Pathname.DASHBOARD_CHARTS, element: <RouteHOC element={<DashboardCharts />} /> },
					],
				},
				{
					path: '*',
					element: <NotFound replace />,
				},
				{
					path: '',
					element: (
						<Suspense fallback={<Loader />}>
							<PrivateOutlet />
						</Suspense>
					),
					children: [
						{ path: Pathname.SECURITY_OFFICER, element: <RouteHOC element={<SecurityApproval />} /> },
					],
				},
				{
					path: '',
					element: (
						<Suspense fallback={<Loader />}>
							<PrivateOutlet />
						</Suspense>
					),
					children: [{ path: Pathname.VENDOR, element: <RouteHOC element={<Vendor />} /> }],
				},
				{
					path: '',
					element: (
						<Suspense fallback={<Loader />}>
							<PrivateOutlet />
						</Suspense>
					),
					children: [
						{
							path: Pathname.FIDS_DASHBOARD,
							element: <RouteHOC element={<FidsDashboard />} />,
							index: true,
						},
						{ path: Pathname.FIDS_RESOURCES, element: <RouteHOC element={<FidsResources />} /> },
					],
				},
			],
		},
	]);

	return routes;
}
