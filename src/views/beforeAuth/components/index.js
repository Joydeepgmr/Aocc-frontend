import React from 'react';
import './index.scss'

// Components
import Button from '../../../components/button/button';
import DropdownButton from '../../../components/dropdownButton/dropdownButton';
import Chip from '../../../components/chip/chip';
import TextField from '../../../components/textField/textField';
import { Divider } from 'antd';


const Components = () => {
	const hello = () => {
		alert('hello1');
	}

	const dropdownItems = [
		{
			label: <a href="https://www.antgroup.com">1st menu item</a>,
			value: 'assdf',
			key: '0',
		},
		{
			label: <a href="https://www.aliyun.com">2nd menu item</a>,
			value: 'rgreg',
			key: '1',
		},
		{
			label: <a href="https://mui.com/material-ui">3rd menu item</a>,
			value: 'jdhfkd',
			key: '2',
		},
		{
			label: <a href="https://ant.design/components/icon">4th menu item</a>,
			value: 'kndf',
			key: '3',
		}
	];

	return (
		<React.Fragment>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'3rem' }}>

				<div className="button-container">
					<Button onClick={hello} title="Save" type='text' className="custom-savebutton" />
					<Button onClick={hello} title="Cancel" type='text' className="custom-cancelbutton" />
					<Button onClick={hello} title="View Details" type='text' className="custom-textbutton" />
					<Button onClick={hello} title='Edit' type='edit' className="custom-buttonEdit" />
					<Button onClick={hello} title='Delete' type='delete' className="custom-buttonEdit" />
					<Button onClick={hello} title='rightArrow' type='rightArrow' className="custom-buttonEdit" />
					<DropdownButton dropdownItems={dropdownItems} buttonText='Create' />
				</div>

				<Divider />

				<TextField />
				
				<Divider />

			</div>
			<div className='chip'>
				<Chip text="Critical" className='criticalChip' />
				<br />
				<Chip text="Cancelled" className='cancelledChip' />
				<br />
				<Chip text="Delay" className='delayChip' />
			</div>

		</React.Fragment>
	);
};

export default Components;
