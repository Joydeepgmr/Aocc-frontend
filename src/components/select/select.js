import React from 'react';
import { Select, Form } from 'antd';
import './select.scss';

const CustomSelect = ({ SelectData, placeholder, label, required, className, name, disabled, ...rest }) => {
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
				name={name}
				disabled={disabled ? disabled : false}
				label={label && renderLabel()}
				className={`select ${className}`}
				rules={[
					{
						message: 'This field is required.',
					},
				]}
			>
				<Select className="select_wrapper" placeholder={placeholder} {...rest}>
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