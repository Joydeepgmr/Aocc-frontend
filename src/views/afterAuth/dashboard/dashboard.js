import React from 'react';
import './dashboard.scss';
import "../../../styles/sass/_variables.scss"
import "../../../styles/sass/_utils.scss"
import { Col, Row } from 'antd';
import CustomTypography from '../../../components/typographyComponent/typographyComponent';
import TableComponent from '../../../components/table/table';
import CustomTabs from '../../../components/customTabs/customTabs';
import MultiSelectComponent from '../../../components/multiSelectComponent/multiSelectComponent';

export const Dashboard = () => {
	return( 
	<div className='container-div'>
		<div className='top-div'>
		<div className='title-div'>
		<CustomTypography type="title" fontSize={32} fontWeight="600" color="black" children={"Flight Information"}/>
		<CustomTypography type="title" fontSize={14} fontWeight="400" color="black" children={"Access information regarding your airlines and track milestones."}/>
		</div>
		</div>
	</div>
	);
};

export default Dashboard;
