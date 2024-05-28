import { Pathname } from '../../pathname';
import * as userType from '../../utils/roles';

// const role = localStorage.getItem('role');

export const roleBasedNav = (role = 'Planner') => {
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
				label: 'Airport Masters',
				children: Pathname.PLANAIRPORTMASTER,
			},
			{
				key: '1',
				label: 'Daily Ops',
				children: Pathname.DASHBOARD,
			},
			{
				key: '2',
				label: 'Planning',
				children: Pathname.PLAN,
			},
			{
				key: '3',
				label: 'CDM',
				children: Pathname.CDM,
			},
			{
				key: '4',
				label: "KPI",
				children: Pathname.DASHBOARD_CHARTS,
			},
		];
	} else if (role === userType.CDM) {
		navItems = [
			{
				key: '0',
				label: 'CDM',
				children: Pathname.CDM,
			},
		];
	} else if (role === userType.SECURITY_OFFICER) {
		navItems = [
			{
				key: '0',
				label: 'Approval',
				children: Pathname.SECURITY_OFFICER,
			},
		];
	} else if (role === userType.VENDOR) {
		navItems = [
			{
				key: '0',
				label: '',
				children: Pathname.VENDOR,
			},
		];
	} else if (role === userType.FIDS) {
		navItems = [
			{
				key: '0',
				label: 'Resources',
				children: Pathname.FIDS_RESOURCES,
			},
			{
				key: '1',
				label: 'Manage Access',
				children: Pathname.FIDS_ACCESS,
			},
		];
	} else if (role === userType.AIRLINE_FIDS) {
		navItems = [
			{
				key: '0',
				label: 'Dashboard',
				children: Pathname.FIDS_DASHBOARD,
			}
		]
	}

	return navItems;
};
