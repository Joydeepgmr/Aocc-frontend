import React, { useState } from 'react';
import Cards from '../../../components/card/card';
import InputField from '../../../components/inputField/inputField';
import { Divider, Form } from 'antd';
import CustomSelect from '../../../components/selectfield/select';
import Date from '../../../components/datapicker/datepicker';
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
import TableComponent from '../../../components/table/table';
import CustomTypography from '../../../components/typographyComponent/typographyComponent';
import MultiSelectComponent from '../../../components/multiSelectComponent/multiSelectComponent';
import TopHeader from '../../../components/topHeader/topHeader';
import OtpField from '../../../components/otpField/otpField';
import TimelineDesign from '../../../components/timeline/timeline';

export const Components = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleTableChange = (pagination, filters, sorter) => {
		console.log('Table changed:', pagination, filters, sorter);
	};
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
	const SelectData = [
		{
			id: '1',
			label: 'options',
			value: 'options',
		},
		{
			id: '2',
			label: 'options',
			value: 'options',
		},
		{
			id: '3',
			label: 'options',
			value: 'options',
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

	const dummyData = [
		{ key: '1', name: 'John Doe', age: 30, address: 'New York' },
		{ key: '2', name: 'Jane Smith', age: 25, address: 'Los Angeles' },
		{ key: '3', name: 'Bob Johnson', age: 40, address: 'Chicago' },
	];

	const columns = [
		{ title: 'Name', dataIndex: 'name', key: 'name' },
		{ title: 'Age', dataIndex: 'age', key: 'age' },
		{ title: 'Address', dataIndex: 'address', key: 'address' },
	];

	const multiSelectOptions = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'cherry', label: 'Cherry' },
	];

	const handleSelectChange = (selectedValues) => {
		console.log('Selected values:', selectedValues);
	};

	const timelineItems = [
		{
			id: 1,
			start: '2024-04-20',
			end: '2024-04-21',
			content: 'Airline 2',
			group: '3',
			className: 'timeline--SecondAirline',
			title: '<div>Flight Number: Flight 1 <br/><br/>Aircraft Type: A123<br/><br/>Status: Landed</div>',
		},
		{
			id: 2,
			start: '2024-04-21',
			end: '2024-04-22',
			content: 'Airline 1',
			group: '2',
			className: 'timeline--SecondAirline',
			title: '<div>Flight Number: Flight 1 <br/><br/>Aircraft Type: A123<br/><br/>Status: Landed</div>',
		},
		{
			id: 3,
			start: '2024-03-20',
			end: '2024-03-21',
			content: 'Airline 3',
			group: '4',
			className: 'timeline--ThirdAirline',
			title: '<div>Flight Number: Flight 1 <br/><br/>Aircraft Type: A123<br/><br/>Status: Landed</div>',
		},
		{
			id: 4,
			start: '2024-04-20',
			end: '2024-04-21',
			content: 'Airline 1',
			group: '6',
			className: 'timeline--FirstAirline',
			title: '<div>Flight Number: Flight 1 <br/><br/>Aircraft Type: A123<br/><br/>Status: Landed</div>',
		},
		{
			id: 5,
			start: '2024-04-20',
			end: '2024-04-21',
			content: 'Airline 2',
			group: '5',
			className: 'timeline--SecondAirline',
			title: '<div>Flight Number: Flight 1 <br/><br/>Aircraft Type: A123<br/><br/>Status: Landed</div>',
		},
		{
			id: 6,
			start: '2024-03-10',
			end: '2024-03-11',
			content: 'Airline 2',
			group: '3',
			className: 'timeline--ThirdAirline',
			title: '<div>Flight Number: Flight 1 <br/><br/>Aircraft Type: A123<br/><br/>Status: Landed</div>',
		},
		{
			id: 7,
			start: '2024-03-11',
			end: '2024-03-12',
			content: 'Airline 1',
			group: '2',
			className: 'timeline--FirstAirline',
			title: '<div>Flight Number: Flight 1 <br/><br/>Aircraft Type: A123<br/><br/>Status: Landed</div>',
		},
		{
			id: 8,
			start: '2024-03-20',
			end: '2024-03-21',
			content: 'Airline 3',
			group: '4',
			className: 'timeline--ThirdAirline',
			title: '<div>Flight Number: Flight 1 <br/><br/>Aircraft Type: A123<br/><br/>Status: Landed</div>',
		},
		{
			id: 9,
			start: '2024-04-20',
			end: '2024-04-21',
			content: 'Airline 1',
			group: '6',
			className: 'timeline--FirstAirline',
			title: '<div>Flight Number: Flight 1 <br/><br/>Aircraft Type: A124<br/><br/>Status: Landed</div>',
		},
	];

	const timelineGroups = [
		{
			id: 1,
			content: 'belt 1',
		},
		{
			id: 2,
			content: 'belt 2',
		},
		{
			id: 3,
			content: 'belt 3',
		},
		{
			id: 4,
			content: 'belt 4',
		},
		{
			id: 5,
			content: 'belt 5',
		},
		{
			id: 6,
			content: 'belt 6',
		},
	];

	return (
		<React.Fragment>
			<div>
				<TimelineDesign items={timelineItems} groups={timelineGroups} editable={false} />
			</div>
			<Form layout="vertical">
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
								<Button title="Open Modal" isSubmit="submit" onClick={openModal} type="filledText" />
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
								<Button
									title="Open CSV Modal"
									type="filledText"
									isSubmit="submit"
									onClick={openCsvModal}
								/>
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
					<Button
						onClick={() => {
							alert('Filled button');
						}}
						title="Save"
						type="filledText"
					/>

					<Button
						onClick={() => {
							alert('Text button');
						}}
						title="View Details"
						type="text"
					/>

					<Button
						onClick={() => {
							alert('Icon Button with Border');
						}}
						type="iconWithBorder"
						icon={RightArrow}
						alt="arrow icon"
					/>

					<Button
						onClick={() => {
							alert('Icon Button');
						}}
						icon={Bell}
						alt="bell icon"
						className="icon_withoutBorder"
					/>

					<DropdownButton dropdownItems={dropdownItems} buttonText="Create" />
				</div>

				<hr />

				<div className="container">
					<TextField row={6} placeholder={'Type in here....'} className="custom_field" />
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
				<Divider />
				<div className="margin">
					<TableComponent columns={columns} data={dummyData} loading={loading} onChange={handleTableChange} />
				</div>
				<Divider />
				<div className="container-column">
					<CustomTypography type="title" fontSize={32} fontWeight="600" color="black">
						Heading 1
					</CustomTypography>
					<CustomTypography type="title" fontSize={28} fontWeight="600" color="black">
						Heading 2
					</CustomTypography>
					<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
						Heading 3
					</CustomTypography>
					<CustomTypography type="title" fontSize={20} fontWeight="600" color="black">
						Heading 4
					</CustomTypography>
					<CustomTypography type="title" fontSize={16} fontWeight="600" color="black">
						Heading 5
					</CustomTypography>
					<CustomTypography type="title" fontSize={14} fontWeight="600" color="black">
						Heading 6
					</CustomTypography>

					<CustomTypography type="paragraph" fontSize={16} color="black">
						Paragraph Text
					</CustomTypography>

					<CustomTypography type="text" fontSize={16} fontWeight="400" color="black">
						Subheading 1
					</CustomTypography>
					<CustomTypography type="text" fontSize={14} fontWeight="400" color="black">
						Subheading 2
					</CustomTypography>
					<CustomTypography type="text" fontSize={12} fontWeight="400" color="black">
						Subheading 3
					</CustomTypography>
				</div>
				<Divider />
				<Cards />
				<Divider />
				<CustomSelect
					required={true}
					SelectData={SelectData}
					label="Select field"
					placeholder={'Select Field'}
				/>
				<Divider />
				<Date label="Date picker" placeholder="Date Picker" handleChange={handleChange} />
				<Divider />
				<div className="container">
					<MultiSelectComponent
						options={multiSelectOptions}
						placeholder="Choose fruits"
						onChange={handleSelectChange}
					/>
				</div>
				<TopHeader
					heading="Manage User Access"
					subHeading="Overview of access management for airport access management"
				/>
				<div className="container">
					<OtpField otpLength={1} label={'ATC Code'} required />
				</div>
			</Form>
		</React.Fragment>
	);
};

export default Components;
