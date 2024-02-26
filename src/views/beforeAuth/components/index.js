import React, { useState } from 'react';
// import Button from '../../../components/button/button';
import InputField from '../../../components/inputField/inputField';
import { Divider, Form } from 'antd';
import './index.scss';
import ModalComponent from '../../../components/modalComponent/modalComponent';
import UploadCsvModal from '../../../components/uploadCsvModal/uploadCsvModal';
import { items } from './indexData';
import CustomTabs from '../../../components/customTabs/customTabs';
import CheckBoxField from '../../../components/checkBoxField/checkBoxField';
import Button from '../../../components/button/button';
import DropdownButton from '../../../components/dropdownButton/dropdownButton';
import Chip from '../../../components/chip/chip';
import TextField from '../../../components/textField/textField';
import Bell from '../../../assets/Bell.svg';
import RightArrow from '../../../assets/RightArrow.svg';

export const Components = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
	const [form] = Form.useForm(); // Use the useForm hook to create a form instance

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
		},
	];
	const openModal = () => {
		setIsModalOpen(true);
	};

	const openCsvModal = () => {
		setIsCsvModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setIsCsvModalOpen(false);
	};

	const handleChange = () => {
		console.log('Tab switch');
	};

	const onFinish = (values) => {
		console.log('Form values:', values); // Output form values to console
	};

	return (
		<React.Fragment>
			<div className="margin">
				<Form form={form} layout="vertical" onFinish={onFinish}>
					<div style={{ display: 'flex', alignContent: 'center', gap: '1rem' }}>
						<InputField
							label="Airport Name"
							name="airportName"
							placeholder="Write Airport Name"
							required
							warning="Required field"
						/>
						<InputField
							label="Airport Number"
							name="airportNumber"
							placeholder="Write Input Number"
							required
							warning="Required field"
							type="number"
						/>

						<InputField
							label="Time Difference Summer"
							name="timeDifferenceSummer"
							placeholder="Time Difference Summer"
							required
							warning="Required field"
							suffixText="hours"
						/>
						<InputField
							label="Password"
							name="password"
							placeholder="Password"
							required
							suffixText="hours"
							type="password"
						/>
					</div>
					<div>
						<InputField
							label="Error State"
							name="airportName"
							placeholder="Error state"
							required
							warning="Required field"
							status="error"
						/>
					</div>
					<Divider />
					<div>
						<InputField
							label="Airport Name"
							name="search"
							placeholder="Search"
							warning="Required field"
							type="search"
						/>
					</div>
					<Divider />

					<div style={{ display: 'flex', alignContent: 'center', gap: '1rem' }}>
						<div>
							<Button title="Open Modal" isSubmit="submit" onClick={openModal} />
							<ModalComponent
								isModalOpen={isModalOpen}
								width="400px"
								closeModal={closeModal}
								title="Modal Heading"
							>
								<div>
									<p>This is the content of the modal.</p>
								</div>
							</ModalComponent>
						</div>
						<div>
							<Button title="Open CSV Modal" isSubmit="submit" onClick={openCsvModal} />
							<UploadCsvModal isModalOpen={isCsvModalOpen} width="720px" closeModal={closeModal} />
						</div>
					</div>
					<Divider />

					<div className="margin">
						<CheckBoxField name="single_checkbox" label="single checkbox" title="Single Checkbox" />
					</div>
					<div>
						<CheckBoxField
							name="multipleCheckbox"
							title="Multiple Checkbox"
							options={[
								{ id: 1, name: 'Option 1' },
								{ id: 2, name: 'Option 2' },
								{ id: 3, name: 'Option 3' },
							]}
							selectedValue="id"
							selectedName="name"
						/>
					</div>
					<Divider />

					<div className="margin">
						<CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} />
						<CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} type="card" />
					</div>
				</Form>
			</div>
			
			<hr />

			<div className="container">
				<Button onClick={() => {
					alert('Filled button');
				}} title="Save" type='filledText' className="filledButton" />

				<Button onClick={() => {
					alert('Text button');
				}} title="View Details" type='text' className="textbutton" />

				<Button onClick={() => {
					alert('Icon Button with Border');
				}} type='iconWithBorder' icon={RightArrow} alt="arrow icon" className="icon_withBorder" />

				<Button onClick={() => {
					alert('Icon Button');
				}} icon={Bell} alt="bell icon" className="icon_withoutBorder"/>


				<DropdownButton dropdownItems={dropdownItems} buttonText='Create' />
			</div>

			<hr />

			<div className='container'>
				<TextField row={6} placeholder={'Type in here....'} className='custom_field'/>
			</div>

			<hr />

			<div className="container">
				<Chip text="Critical" className="criticalChip" />
				<br />
				<Chip text="Cancelled" className="cancelledChip" />
				<br />
				<Chip text="Notice" className="noticeChip" />
				<br />
				<Chip text="Delay" className="delayChip" />
			</div>
		</React.Fragment>
	);
};

export default Components;
