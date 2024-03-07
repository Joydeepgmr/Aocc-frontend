import React from 'react';
import { Navigate } from 'react-router';

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
		label: 'Global Masters',
		children: 'import component Global masters',
	},
	{
		key: '4',
		label: 'Airport Masters',
		children: 'import component Airport masters',
	},
];

export const navMenuITadmin = [
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
