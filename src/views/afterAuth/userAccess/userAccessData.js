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
	},
];

export const CountryData = [
	{
		id: '1',
		label: 'India',
		value: 'India',
	},
	{
		id: '2',
		label: 'Australia',
		value: 'Australia',
	},
	{
		id: '3',
		label: 'Argentina',
		value: 'Argentina',
	},
];

export const HomeAirportData = [
	{
		id: '1',
		label: 'HomeAirport1',
		value: 'HomeAirport1',
	},
	{
		id: '2',
		label: 'HomeAirport2',
		value: 'HomeAirport2',
	},
	{
		id: '3',
		label: 'HomeAirport3',
		value: 'HomeAirport3',
	},
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

export const SelectTypeOfUse = [
	{ id: 1, label: 'Commercial', value: 'Commercial' },
	{ id: 2, label: 'Government', value: 'Government' },
	{ id: 3, label: 'Cargo', value: 'Cargo' },
	{ id: 4, label: 'Personal', value: 'Personal' },
]
export const SelectAcBodyType = [
	{ id: 1, label: 'Wide-Body', value: 'Wide-Body' },
	{ id: 2, label: 'Commuter', value: 'Commuter' },
	{ id: 3, label: 'Narrow-Body', value: 'Narrow-Body' },
	{ id: 4, label: 'Airbus', value: 'Airbus' },
	{ id: 4, label: 'Airplane', value: 'Airplane' },
	{ id: 4, label: 'Jets', value: 'Jets' },
	{ id: 4, label: 'Piston', value: 'Piston' }
]
export const SelectEngineType = [
	{ id: 1, label: 'Jet', value: 'Jet' },
	{ id: 2, label: 'Turbopop', value: 'Turbopop' }
]
export const TerminalData = [
	{
		id: '1',
		label: 'terminal123',
		value: 'terminal123',
	},
	{
		id: '2',
		label: 'terminal234',
		value: 'terminal1234',
	},
	{
		id: '3',
		label: 'terminal63',
		value: 'terminal67',
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
