import React from 'react';

import DummyComponent1 from './dummyComponents/dummyComponent1';
import DummyComponent2 from './dummyComponents/dummyComponent2';
import DummyComponent3 from './dummyComponents/dummyComponent3';
import DummyComponent4 from './dummyComponents/dummyComponent4';

export const items = [
	{
		key: '1',
		label: 'Flight Schedule',
		children: <DummyComponent1 />,
	},
	{
		key: '2',
		label: 'Milestone',
		children: <DummyComponent2 />,
	},
	{
		key: '3',
		label: 'Map View',
		children: <DummyComponent3 />,
	},
	{
		key: '4',
		label: 'Telex Messaging Gateway',
		children: <DummyComponent4 />,
	},
];
