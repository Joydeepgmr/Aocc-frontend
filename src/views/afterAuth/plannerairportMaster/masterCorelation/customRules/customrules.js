import React from 'react';
import Common_Card from '../../common_wrapper/common_card.js/common_card';
import Common_table from '../../common_wrapper/common_table/commontable';
import { useSelector } from 'react-redux';
import FormComponent from './formComponents/formComponent';
const CustomRules = () => {
	const { isShowTableComponents } = useSelector((state) => state.PlannerAirportMaster);
	return (
		<>
			{isShowTableComponents && isShowTableComponents ? (
				<Common_table Heading={'Setup your airline'} />
			) : (
				<Common_Card
					title1="Create"
					title2={'Upload CSV'}
					title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'Create custom aircraft rules'}
					formComponent={<FormComponent />}
				/>
			)}
		</>
	);
};

export default CustomRules;
