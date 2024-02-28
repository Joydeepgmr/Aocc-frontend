import React from 'react';

import { Select, Form } from 'antd';
import './select.scss';

const CustomSelect = ({ SelectData, placeholder, label, required, ...rest }) => {
	const renderLabel = () => {
		return (
			<>
				{label}
				{required && <span style={{ color: 'red' }}> *</span>}
			</>
		);
	};
	return (
		<>
			<Form.Item
				name={label}
				label={renderLabel()}
				className="select"
				rules={[
					{
					
						message: 'This field is required.',
					},
				]}
			>

					<Select className="select_wrapper" placeholder={placeholder}>
						{SelectData.map((option, index) => (
							<Option key={option.index} value={option.value}>
								{option.name}
							</Option>
						))}
					</Select>
			
			</Form.Item>
		</>
	);
};
export default CustomSelect;
