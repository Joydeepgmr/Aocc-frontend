import React from 'react';
import { Link, Route } from 'react-router-dom';
import Airport from '../../views/afterAuth/airportMaster/airport';
export const navMenu = [
	{
		key: '0',
		label: 'Dashboard',
		children: 'import component Dashboard',
	},
	{
		key: '1',
		label: 'Tasks',
		children: 'import component Tasks',
	},
	{
		key: '2',
		label: 'Plans',
		children: 'import component Plans',
	},
	{
		key: '3',
		label: 'Airport Masters',
		children: <Airport />,
	},
];
