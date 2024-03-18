import React, { useState } from 'react';
import Common_table from '../../common_wrapper/common_table/common_table';
import Common_Card from '../../common_wrapper/common_card.js/common_card';
import FormComponent from './formComponent/formComponent';
import { useSelector } from 'react-redux';

const Airlines = () => {
	const { isShowTableComponents } = useSelector((state) => state.PlannerAirportMaster);
	return (
		<>
			{isShowTableComponents && isShowTableComponents ? (
				<Common_table Heading={'Setup your airline'} />
			) : (
				<Common_Card
					title1="Create"
					title2={'Import Global Reference'}
					btnCondition={false}
					Heading={'Setup your airline'}
					formComponent={<FormComponent />}
				/>
			)}
		</>
	);
};

export default React.memo(Airlines);
