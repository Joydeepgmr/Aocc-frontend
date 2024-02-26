import React from 'react';
import './index.scss'

// Components
import Button from '../../../components/button/button';
import DropdownButton from '../../../components/dropdownButton/dropdownButton';
import Chip from '../../../components/chip/chip';
import TextField from '../../../components/textField/textField';
import Bell from '../../../assets/Bell.svg';
import RightArrow from '../../../assets/RightArrow.svg';


const Components = () => {
	const dropdownItems = [
		{
			label: <a href="https://ant.design/docs/spec/shadow">1st menu item</a>,
			value: 'assdf',
			key: '0',
		},
		{
			label: <a href="https://mui.com/material-ui/all-components/">2nd menu item</a>,
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

			<div className="container">
				<Button onClick={() => {
					alert('Filled button');
				}} title="Save" type='filledText' className="custom_filledButton" />

				<Button onClick={() => {
					alert('Text button');
				}} title="View Details" type='text' className="custom_textbutton" />

				<Button onClick={() => {
					alert('Icon Button with Border');
				}} type='iconWithBorder' icon={RightArrow} alt="arrow icon" className="custom_arrowbutton" />

				<Button onClick={() => {
					alert('Icon Button');
				}} icon={Bell} alt="bell icon" />


				<DropdownButton dropdownItems={dropdownItems} buttonText='Create' />
			</div>

			<hr />

			<div className='container'>
				<TextField row={6} placeholder={'Type in here....'} className='custom_field' />
			</div>

			<hr />

			<div className='container'>
				<Chip text="Critical" className='criticalChip' />
				<br />
				<Chip text="Cancelled" className='cancelledChip' />
				<br />
				<Chip text="Notice" className='noticeChip' />
				<br />
				<Chip text="Delay" className='delayChip' />
			</div>

		</React.Fragment>
	);
};

export default Components;