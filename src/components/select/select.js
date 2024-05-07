import React from 'react';
import { Select, Form } from 'antd';
import './select.scss';

const CustomSelect = ({
	SelectData = [],
	placeholder,
	label,
	required,
	className,
	name,
	disabled,
	onChange,
	multiple,
	defaultValue,
	...rest
}) => {
	const renderLabel = () => {
		return (
			<>
				{label}
				{/* {required && <span style={{ color: 'red' }}> *</span>} */}
			</>
		);
	};

	const handleSelectChange = (value) => {
		if (onChange) {
			onChange(value);
		}
	};

	const filterOption = (inputValue, option) => {
		return option.children.toLowerCase().includes(inputValue.toLowerCase());
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
						required: required,
						message: 'This field is required.',
					},
				]}
			>
				<Select
					mode={multiple && 'multiple'}
					showSearch
					className="select_wrapper"
					allowClear
					disabled={disabled}
					placeholder={placeholder}
					onChange={handleSelectChange}
					filterOption={filterOption}
					{...rest}
					defaultValue={defaultValue}
					getPopupContainer={() => document.querySelector('.dropdown-children')}
				>
					{SelectData.map((option, index) => (
						<Select.Option key={index} value={option.value}>
							{option?.label}
						</Select.Option>
					))}
				</Select>
				<div className="dropdown-children"></div>
			</Form.Item>
		</>
	);
};

export default CustomSelect;
