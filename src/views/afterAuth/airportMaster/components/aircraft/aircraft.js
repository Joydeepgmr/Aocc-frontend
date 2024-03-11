import React, { useState } from 'react';
import FormComponent from './formComponent/formComponent';
import { useNavigate } from 'react-router-dom';
import './aircraft.scss';
import Common_Card from '../../common_wrapper/common_card.js/common_card';
import Common_table from '../../common_wrapper/common_table/common_table';
import { useSelector } from 'react-redux';
const Aircrafts = () => {
	const { isShowTableCompoenents } = useSelector((state) => state.AirportMaster);
	return (
		<>
			{isShowTableCompoenents && isShowTableCompoenents ? (
				<Common_table Heading={'Setup aircraft registration'} />
			) : (
				<Common_Card
					title1="Create"
					title2={'Import Global Reference'}
					btnCondition={false}
					Heading={'Setup aircraft registration'}
				/>
			)}
		</>
	);
};

export default React.memo(Aircrafts);
