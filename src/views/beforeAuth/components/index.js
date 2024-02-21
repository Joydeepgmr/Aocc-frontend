import React, { useState } from 'react';
import Button from '../../../components/button/button';
import InputField from '../../../components/inputField/inputField';
import { Divider, Form } from 'antd';
import './index.scss';
import ModalComponent from '../../../components/modalComponent/modalComponent';
import UploadCsvModal from '../../../components/uploadCsvModal/uploadCsvModal';
import { items } from './indexData';
import CustomTabs from '../../../components/customTabs/customTabs';
import CheckBoxField from '../../../components/checkboxField/checkboxField';

export const Components = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
	const [form] = Form.useForm(); // Use the useForm hook to create a form instance

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
					<div style={{ display: 'flex', alignContent: 'center' }}>
						<InputField
							label="Airport Name"
							name="airportName"
							placeholder="Write Airport Name"
							required
							warning="Required field"
						/>
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
							<Button title="Open Modal" type="submit" onClick={openModal} />
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
							<Button title="Open CSV Modal" type="submit" onClick={openCsvModal} />
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
					</div>
				</Form>
			</div>
		</React.Fragment>
	);
};

export default Components;
