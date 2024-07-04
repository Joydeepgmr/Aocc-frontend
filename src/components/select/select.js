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
	allowClear = true,
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
					allowClear={allowClear}
					disabled={disabled}
					placeholder={placeholder}
					onChange={handleSelectChange}
					filterOption={filterOption}
					{...rest}
					defaultValue={defaultValue}
				>
					{SelectData.map((option, index) => (
						<Select.Option key={index} value={option.value}>
							{option?.label}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
		</>
	);
};

export default CustomSelect;
