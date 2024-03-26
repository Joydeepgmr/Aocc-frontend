import React from 'react';
import { Select, Form } from 'antd';
import './select.scss';

const CustomSelect = ({ SelectData, placeholder, label, required, className, name, disabled, ...rest }) => {
	const renderLabel = () => {
		return (
			<>
				{label}
			</>
		);
	};
	return (
		<>
			<Form.Item
				name={name}
				
				label={label && renderLabel()}
				className={`select ${className}`}
				rules={[
					{
						required: required,
						message: 'This field is required.',
					},
				]}
			>
				<Select className="select_wrapper" placeholder={placeholder} {...rest} disabled={disabled ? disabled : false}>
					{SelectData.map((option, index) => (
						<Select.Option key={index} value={option.value}>
							{option.name}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
		</>
	);
};
export default CustomSelect;