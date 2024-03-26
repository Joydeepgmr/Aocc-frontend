
import { useGetGlobalAircraftType } from '../../../services/globalMasters/globalMaster';

export const SelectData = [
	{
		id: '1',
		label: 'International',
		value: 'INTERNATIONAL',
	},
	{
		id: '2',
		label: 'National',
		value: 'NATIONAL',
	},
	{
		id: '3',
		label: 'Both',
		value: 'BOTH',
	},
];


export const SelectPaymentData = [
	{
		id: '1',
		label: 'Credit',
		value: 'CREDIT',
	},
	{
		id: '2',
		label: 'Cash',
		value: 'CASH',
	}
];


export const SelectAircraftTye = [
	{
		id: '1',
		label: 'International',
		value: 'INTERNATIONAL',
	},
	{
		id: '2',
		label: 'National',
		value: 'NATIONAL',
	},
	{
		id: '3',
		label: 'Both',
		value: 'BOTH',
	},
];


export const dummyData = [
	{
		key: '1',
		userName: 'Jitesh',
		accessType: 'IT Admin',
		userType: 'Senior',
		accessValidity: 'Lifetime',
		accessProvider: 'Shashank',
		createdOn: '2024-02-29',
	},
	{
		key: '2',
		userName: 'Sameer',
		accessType: 'IT Admin',
		userType: 'Senior',
		accessValidity: 'Lifetime',
		accessProvider: 'Shashank',
		createdOn: '2024-02-29',
	},
	{
		key: '3',
		userName: 'Abhishek',
		accessType: 'IT Admin',
		userType: 'Senior',
		accessValidity: 'Lifetime',
		accessProvider: 'Shashank',
		createdOn: '2024-02-29',
	},
	{
		key: '4',
		userName: 'Ankit',
		accessType: 'IT Admin',
		userType: 'Senior',
		accessValidity: 'Lifetime',
		accessProvider: 'Shashank',
		createdOn: '2024-02-29',
	},
];

export const columns = [
	{ title: 'User Name', dataIndex: 'userName', key: '1' },
	{ title: 'Access Type', dataIndex: 'accessType', key: '2' },
	{ title: 'User Type', dataIndex: 'userType', key: '3' },
	{ title: 'Access Validity', dataIndex: 'accessValidity', key: '4' },
	{ title: 'Access Provider', dataIndex: 'accessProvider', key: '5' },
	{ title: 'Created On', dataIndex: 'createdOn', key: '6' },
];

// const { data: fetchedGlobalAircraftType } = useGetGlobalAircraftType();
// export const SelectAircraftType = fetchedGlobalAircraftType ? fetchedGlobalAircraftType.map((item, index) => ({
// 	id: index.toString(),
// 	label: item.label,
// 	value: item.value,
//   })) : [];
