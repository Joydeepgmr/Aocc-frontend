import React, { useState } from 'react';
import CustomTypography from '../../../components/typographyComponent/typographyComponent';
import CustomTabs from '../../../components/customTabs/customTabs';
import './planning.scss';
import Seasonal from '../seasonal/seasonal';
import ShortTerm from '../shortterm/shortterm';
import CDM from '../CDM/CDM';


const Planning = () => {
	const [index, setIndex] = useState(0);
	const items = [
		{
			key: '1',
			label: 'Seasonal',
			children: <Seasonal />,
		},
		{
			key: '2',
			label: 'Short Term',
			children: <ShortTerm />,
		},
		{
			key: '3',
			label: 'CDM',
			children: <CDM />,
		},
	];
	const handleChange = (key) => {
		setIndex(key);
	};
	return (
		<>
			<div className="box">
				<div>
					<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
						Operational Planning
					</CustomTypography>
					<CustomTypography type="text" fontSize={14} fontWeight="400" color="#909296">
						Data for seasonal and daily operations of aircrafts
					</CustomTypography>
				</div>
				<CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} type="card" />
			</div>
		</>
	);
};

export default Planning;
