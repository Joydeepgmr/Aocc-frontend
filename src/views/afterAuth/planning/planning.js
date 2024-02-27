import React, { useState } from 'react';
import CustomTypography from '../../../components/typographyComponent/typographyComponent';
import CustomTabs from '../../../components/customTabs/customTabs';
import './planning.scss';
const Planning = () => {
	const [index, setIndex] = useState(0);
	const items = [
		{
			key: '1',
            label: 'Seasonal',
          
            
		},
		{
			key: '2',
			label: 'Short Term',
		},
		{
			key: '3',
			label: 'CDM',
		},
	];
	const handleChange = (key) => {
		setIndex(key);
	};
	return (
		<>
			<div className="box">
				<div className="mainhead">
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
