import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { Pathname } from '../pathname';
import AccessControl from "../rbac/access-control";
import NoAccess from "../rbac/no-access";
import { Permission } from "../rbac/permission";



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
            errorElement: <NotFound />,
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
};