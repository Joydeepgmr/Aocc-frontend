import React from 'react';
import Dashboard from '../../views/afterAuth/dashboard/dashboard';
import Plans from '../../views/afterAuth/plans/plans';


export const navMenu = [
	{
		key: '0',
		label: 'Dashboard',
		children: <Dashboard />,
	},
	{
		key: '1',
		label: 'Tasks',
		children: 'import component Tasks',
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
