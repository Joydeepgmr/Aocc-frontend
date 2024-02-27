import React, { useState } from 'react';

// Components
import Button from '../../../components/button/button';
import HrLine from '../../../components/hrLine/hrLine';
import CustomSelect from '../../../components/selectfield/select';
import Card from '../../../components/card/cards';
import Date from '../../../components/datapicker/datepicker';

const SelectData = [
	{
		id: '1',
		value: 'options',
		label: 'options',
	},
	{
		id: '2',
		value: 'options',
		label: 'options',
	},
	{
		id: '3',
		value: 'options',
		label: 'options',
	},
	{
		id: '4',
		value: 'options',
		label: 'options',
	},
];

export const Components = () => {


	return (
		<React.Fragment>
			<Card />
			<hr />
			<CustomSelect label={'Select Options'} placeholder={'Select Options'} SelectData={SelectData} />
			<hr />
			<Date dateFormat={'MM/DD/YYYY'} label="Date Picker" placeholder="Date Picker"/>
			<hr />
		</React.Fragment>
	);
};

export default Components;
