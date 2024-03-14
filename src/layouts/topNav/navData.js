import React from 'react';
import { Link, Route } from 'react-router-dom';
import Airport from '../../views/afterAuth/airportMaster/airport';
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
		label: 'AirportMasters',
		value: "/plan-airport-masters",
		children: <Airport />,
	},
];
