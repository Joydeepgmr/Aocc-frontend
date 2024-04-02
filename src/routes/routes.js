import React, { Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import PrivateOutlet from '../privateRoute';
import { Pathname } from '../pathname';


import Loader from '../components/loader';
import NotFound from '../views/404';
import Login from '../views/beforeAuth/login/login';
import Layout from '../layouts/layout/layout';
import UserAccess from '../views/afterAuth/userAccess/userAccess';
import AirportMasters from '../views/afterAuth/airportMasters/airportMasters';
import GlobalMasters from '../views/afterAuth/globalMasters/globalMasters';
import PlannerAirportMaster from '../views/afterAuth/plannerairportMaster/airport';
import Plans from '../views/afterAuth/plans/plans';
import Dashboard from '../views/afterAuth/dashboard/dashboard';
import Components from '../views/beforeAuth/components';

// ----------------------------------------------------------------------

const RouteHOC = (props) => {
    return <Layout>{props.element}</Layout>
}

export default function Router() {
    const routes = useRoutes([
        {
            element: (
                <Suspense fallback={<Loader />}>
                    <PrivateOutlet />
                </Suspense>
            ),
            children: [
                { path: Pathname.DASHBOARD, element: <RouteHOC element={<Dashboard />} />, index: true },
                { path: Pathname.USERACCESS, element: <RouteHOC element={<UserAccess />} /> },
                { path: Pathname.GLOBALMASTERS, element: <RouteHOC element={<GlobalMasters />} />, },
                { path: Pathname.AIRPORTMASTERS, element: <RouteHOC element={<AirportMasters />} />, },
                { path: Pathname.PLANAIRPORTMASTER, element: <RouteHOC element={<PlannerAirportMaster />} />, },
                { path: Pathname.PLAN, element: <Layout><Plans /></Layout> },
            ],
        },
        // {
        //     path: Pathname.LANDING_PAGE,
        //     element: <LandingPage />
        // },
        {
            path: Pathname.LOGIN,
            element: <Login />,
        },
        {
            path: Pathname.COMPONENTS,
            element: <Components />
        },
        {
            path: Pathname[404],
            element: <NotFound />
        },
        {
            path: "*",
            element: <Navigate to="/404" replace />,
        },
    ]);

    return routes;
}
