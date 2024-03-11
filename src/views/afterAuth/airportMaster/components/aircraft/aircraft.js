import React, { useState } from 'react';
import FormComponent from './formComponent/formComponent';
import './aircraft.scss';
import Common_Card from '../../common_wrapper/common_card.js/common_card';
import Common_table from '../../common_wrapper/common_table/common_table';
const Aircrafts = () => {
	return (
		<>
			{/* <Common_Card
				title1="Create"
				title2={'Import Global Reference'}
				btnCondition={false}
				Heading={'Setup aircraft registration'}
			/> */}
			<Common_table />
		</>
	);
};

export default React.memo(Aircrafts);
