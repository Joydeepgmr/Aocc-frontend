import { Form, Input, InputNumber } from 'antd';
import React from 'react';
import './inputField.scss';
import { SearchOutlined } from '@ant-design/icons';

const InputField = ({
	label,
	name,
	placeholder,
	required,
	warning,
	pattern,
	type,
	disabled,
	className = '',
	suffixText,
	status,
}) => {
	const renderLabel = () => {
		return (
			<>
				{label}
				{required && <span style={{ color: 'red' }}> *</span>}
			</>
		);
	};

	const numberPattern = /^[0-9]*$/;
	const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	return (
		<>
			{type === 'number' ? (
				<Form.Item
					label={renderLabel()}
					name={name}
					rules={[
						{
							message: warning ? warning : 'This field is required.',
						},
						{
							pattern: type === 'number' ? numberPattern : null,
							message: type === 'number' ? 'Please enter only numbers' : 'Enter the valid format',
						},
					]}
				>
					<Input
						placeholder={placeholder}
						disabled={disabled ? disabled : false}
						className={`input_field ${className}`}
						suffix={suffixText && <span>{suffixText}</span>}
					/>
				</Form.Item>
			) : type === 'password' ? (
				<Form.Item
					label={renderLabel()}
					name={name}
					rules={[
						{
							message: warning ? warning : 'This field is required.',
						},
						{
							pattern: pattern ?? passwordPattern,
							message:
								'Password must be at least 8 characters and contain at least 1 uppercase, 1 lowercase, 1 digit, 1 special character',
						},
					]}
				>
					<Input.Password
						placeholder={placeholder}
						disabled={disabled ? disabled : false}
						className={`input_field ${className}`}
					/>
				</Form.Item>
			) : (
				<Form.Item
					label={type !== 'search' ? renderLabel() : null}
					name={name}
					min="0"
					rules={[
						{
							message: warning ? warning : 'This field is required.',
						},
						{
							pattern: pattern,
							message: 'Enter the valid format',
						},
					]}
				>
					<Input
						placeholder={placeholder}
						disabled={disabled ? disabled : false}
						className={`input_field ${className}`}
						prefix={type === 'search' ? <SearchOutlined /> : null}
						suffix={suffixText && <span>{suffixText}</span>}
						status={status}
					/>
				</Form.Item>
			)}
		</>
	);
};

export default React.memo(InputField);
