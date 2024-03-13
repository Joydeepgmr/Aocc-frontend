import React from 'react';
import { Navigate } from 'react-router';
import Dashboard from '../../views/afterAuth/dashboard/dashboard';
import Plans from '../../views/afterAuth/plans/plans';
import { useLocation } from 'react-router-dom';
const role = localStorage.getItem('role');
console.log('what is the role', role);

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
		children: 'import component Airport masters',
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


export const roleBasedNav = (pathname) => {
	let navItems = [];

	if (role === 'ADMIN' || pathname ==='/global-masters') {
		navItems = [
			{
				key: '0',
				label: 'Global Masters',
				children: '/global-masters',
			},
			{
				key: '1',
				label: 'Airport Masters',
				children: '/airport-masters',
			},
		];
	} else if (role === 'PLANNER' || pathname ==='/dashboard') {
		navItems = [
			{
				key: '0',
				label: 'Dashboard',
				children: '/dashboard',
			},
			{
				key: '1',
				label: 'Plans',
				children: '/plans',
			},
			{
				key: '2',
				label: 'Airport Masters',
				children: '/airport-masters',
			},
		];
	}
	return navItems;
};
// const navItems = RoleBaseddNav();
// export { navItems:RoleBaseddNav() };