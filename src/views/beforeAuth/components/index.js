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
import TableComponent from '../../../components/table/table';
import CustomTypography from '../../../components/typographyComponent/typographyComponent';
import MultiSelectComponent from '../../../components/multiSelectComponent/multiSelectComponent';

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
		{ value: "apple", label: "Apple" },
    	{ value: "banana", label: "Banana" },
    	{ value: "cherry", label: "Cherry" },
	]

	const handleSelectChange = (selectedValues) => {
		console.log("Selected values:", selectedValues);
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
			<div className="container">
				<Button
					onClick={() => {
						alert('Filled button');
					}}
					title="Save"
					type="text"
					className="custom_savebutton"
				/>
				<Button
					onClick={() => {
						alert('Filled button');
					}}
					title="Cancel"
					type="text"
					className="custom_cancelbutton"
				/>
				<Button
					onClick={() => {
						alert('Text button');
					}}
					title="View Details"
					type="text"
					className="custom_textbutton"
				/>
				<Button
					onClick={() => {
						alert('Edit button');
					}}
					title="Edit"
					type="edit"
					className="custom_buttonEdit"
				/>
				<Button
					onClick={() => {
						alert('Delete button');
					}}
					title="Delete"
					type="delete"
					className="custom_buttonEdit"
				/>
				<Button
					onClick={() => {
						alert('Arrow button');
					}}
					title="Arrow"
					type="arrow"
					className="custom_arrow"
				/>
				<Button
					onClick={() => {
						alert('Right Arrow button');
					}}
					title="RightArrow"
					type="rightArrow"
					className="custom_arrowbutton"
				/>
				<Button
					onClick={() => {
						alert('Left Arrow button');
					}}
					title="LeftArrow"
					type="leftArrow"
					className="custom_arrowbutton"
				/>
				<Button
					onClick={() => {
						alert('Filter button');
					}}
					title="Filter"
					type="filter"
					className="custom_filter"
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
			<div className='margin'>
				<TableComponent
            		columns={columns}
            		data={dummyData}
            		loading={loading}
            		onChange={handleTableChange}
            		tableTitle="Dummy Table"
        		/> 

			</div>
			<Divider />
			<div className='container-column'>
			<CustomTypography type="title" fontSize={32} fontWeight="600" color="black">Heading 1</CustomTypography>
      		<CustomTypography type="title" fontSize={28} fontWeight="600" color="black">Heading 2</CustomTypography>
      		<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">Heading 3</CustomTypography>
      		<CustomTypography type="title" fontSize={20} fontWeight="600" color="black">Heading 4</CustomTypography>
      		<CustomTypography type="title" fontSize={16} fontWeight="600" color="black">Heading 5</CustomTypography>
      		<CustomTypography type="title" fontSize={14} fontWeight="600" color="black">Heading 6</CustomTypography>
      
      		<CustomTypography type="paragraph" fontSize={16} color="black">Paragraph Text</CustomTypography>
      
      		<CustomTypography type="text" fontSize={16} fontWeight="400" color="black">Subheading 1</CustomTypography>
      		<CustomTypography type="text" fontSize={14} fontWeight="400" color="black">Subheading 2</CustomTypography>
      		<CustomTypography type="text" fontSize={12} fontWeight="400" color="black">Subheading 3</CustomTypography>
			</div>
			<Divider />
			<div className='container'>
			<MultiSelectComponent
        	options={multiSelectOptions}
        	placeholder="Choose fruits"
        	onChange={handleSelectChange}
      />
			</div>
		</React.Fragment>
	);
};

export default Components;
