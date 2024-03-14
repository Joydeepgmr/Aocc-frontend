import React from 'react';
import Common_Card from '../../common_wrapper/common_card.js/common_card';
import Common_table from '../../common_wrapper/common_table/common_table';
import { useSelector } from 'react-redux';
import './aircraft.scss';
import FormComponent from '../../../plans/components/formComponent/formComponent';
const Aircrafts = () => {
	const { isShowTableComponents } = useSelector((state) => state.PlannerAirportMaster);
    
	return (
		<>
			{isShowTableComponents && isShowTableComponents ? (
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
