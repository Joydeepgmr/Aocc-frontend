import React from 'react';
import { Navigate } from 'react-router';
import Dashboard from '../../views/afterAuth/dashboard/dashboard';
import Plans from '../../views/afterAuth/plans/plans';
import PlannerAirportMaster from "../../views/afterAuth/plannerairportMaster/airport"
import * as userType from "../../utils/roles";
import { Pathname } from '../../pathname';


const role = localStorage.getItem('role');

export const navMenu = [
	{
		key: '0',
		label: 'Dashboard',
		children: <Dashboard />,
	},
	{
		key: '2',
		label: 'Plans',
		children: <Plans />,
	},
	{
		key: '3',
		label: 'Airport Masters',
		children: <PlannerAirportMaster />,
	},
];

// export const navItems = [
// 	{
// 		key: '0',
// 		label: 'Global Masters',
// 		children: '/global-masters',
// 	},
// 	{
// 		key: '1',
// 		label: 'Airport Masters',
// 		children: '/airport-masters',
// 	},
// ];

export const roleBasedNav = () => {
	let navItems = [];

	if (role === userType.IT_ADMIN) {
		navItems = [
			{
				key: '0',
				label: 'Global Masters',
				children: Pathname.GLOBALMASTERS,
			},
			{
				key: '1',
				label: 'Airport Masters',
				children: Pathname.AIRPORTMASTERS,
			},
		];
	} else if (role === userType.PLANNER) {
		navItems = [
			{
				key: '0',
				label: 'Dashboard',
				children: Pathname.DASHBOARD,
			},
			{
				key: '1',
				label: 'Plans',
				children: Pathname.PLAN,
			},
			{
				key: '2',
				label: 'Airport Masters',
				children: Pathname.PLANAIRPORTMASTER,
			},
		];
	}
	return navItems;
};
