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
			{
				key: '3',
				label: 'CDM',
				children: Pathname.CDM,
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
	}
		else if (role === userType.SECURITY_OFFICER) {
			navItems = [
				{
					key: '0',
					label: 'Approval',
					children: Pathname.SECURITY_OFFICER,
				},]
		}
	
	return navItems;
};
