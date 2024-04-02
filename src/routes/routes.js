import React, { Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import PrivateOutlet from '../privateRoute';
import { Pathname } from '../pathname';
import AccessControl from "../rbac/access-control";
import NoAccess from "../rbac/no-access";
import { Permission } from "../rbac/permission";



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

const AccessControlHOC = (props) => {
    return (
        <AccessControl
            allowedPermissions={props.access}
            renderNoAccess={() => <NoAccess permissionsNeeded={props.access} />}
        >
            <Layout>{props.element}</Layout>
        </AccessControl>
    )
}

export default function Router(props) {

    const routes = useRoutes([
        {
            element: (
                <Suspense fallback={<Loader />}>
                    <PrivateOutlet />
                </Suspense>
            ),
            children: [
                // ------- Planner ---------
                {
                    path: Pathname.DASHBOARD,
                    element: <AccessControlHOC
                        element={<Dashboard />}
                        access={Permission.planner}
                    />,
                    index: true
                },
                {
                    path: Pathname.PLAN,
                    element: <AccessControlHOC
                        element={<Plans />}
                        access={Permission.planner}
                    />
                },
                {
                    path: Pathname.USERACCESS,
                    element: <AccessControlHOC
                        element={<UserAccess />}
                        access={Permission.planner}
                    />
                },
                {
                    path: Pathname.PLANAIRPORTMASTER,
                    element: <AccessControlHOC
                        element={<PlannerAirportMaster />}
                        access={Permission.planner}
                    />,
                },
                // ------- Admin ---------
                {
                    path: Pathname.GLOBALMASTERS,
                    element: <AccessControlHOC
                        element={<GlobalMasters />}
                        access={Permission.admin}
                    />,
                },
                {
                    path: Pathname.AIRPORTMASTERS,
                    element: <AccessControlHOC
                        element={<AirportMasters />}
                        access={Permission.admin}
                    />,
                },
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
