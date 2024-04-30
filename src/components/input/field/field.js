import { SearchOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber } from 'antd';
import React, { useState } from 'react';

import './field.scss';

const InputField = ({
	label,
	name,
	placeholder,
	required,
	warning,
	pattern,
	patternWarning,
	type,
	disabled,
	className = '',
	suffixText,
	status,
	rest,
	codeLength,
	validator,
	min,
	max,
	defaultValue,
	isArticle = true,
}) => {
	const numberPattern = /^[0-9]*$/;
	const Regex_CheckSpace = /^\S/;
	const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	const inputs = [];
	const [codeValue, setCodeValue] = useState('');
	const validateRange = (_, value) => {
		if (!value) {
			return Promise.resolve();
		}
		let errorMessage;
		if (min !== undefined && max !== undefined) {
			if (min === max) {
				errorMessage = `Required ${type === 'number' ? 'value' : 'length'} is ${min}${type !== 'number' ? ' characters' : ''}.`;
			} else {
				errorMessage = `${type === 'number' ? 'Value' : 'Length'} must be between ${min} and ${max}${type !== 'number' ? ' characters' : ''}.`;
			}
		} else if (min !== undefined) {
			errorMessage = `Minimum ${type === 'number' ? 'Value' : 'Length'} required is ${min}${type !== 'number' ? ' characters' : ''}.`;
		} else if (max !== undefined) {
			errorMessage = `Maximum ${type === 'number' ? 'Value' : 'Length'} required is ${max}${type !== 'number' ? ' characters' : ''}.`;
		}
		if (type === 'number') {
			if ((max !== undefined && value > max) || (min !== undefined && value < min)) {
				return Promise.reject(errorMessage);
			}
		} else {
			if ((max !== undefined && value.length > max) || (min !== undefined && value.length < min)) {
				return Promise.reject(errorMessage);
			}
		}
		return Promise.resolve();
	};
	const renderLabel = () => {
		return <>{label}</>;
	};

	const handleCodeChange = (index, value) => {
		const updatedCodeValue = codeValue.substring(0, index) + value + codeValue.substring(index + 1);
		console.log(codeValue, 'codeValue');
		return updatedCodeValue;
	};

	if (type === 'code') {
		for (let i = 0; i < codeLength; i++) {
			inputs.push(
				<Input
					disabled={disabled ? disabled : false}
					className={`input_field code_input_single`}
					maxLength={1}
					max={max}
					defaultValue={defaultValue}
					{...rest}
					onChange={(e) => handleCodeChange(i, e.target.value)}
				/>
			);
		}
	}

	return (
		<>
			{type === 'number' ? (
				<Form.Item
					label={renderLabel()}
					name={name}
					className={`${className} input_form_item`}
					rules={[
						{
							required: required,
							message: warning ? warning : 'This field is required.',
						},
						{
							pattern: Regex_CheckSpace,
							message: 'First character cannot be blank.',
						},
						{
							pattern: type === 'number' ? numberPattern : null,
							message: type === 'number' ? 'Please enter only numbers' : 'Enter the valid format',
						},
						{ validator: validator ?? validateRange },
					]}
				>
					<InputNumber
						placeholder={placeholder}
						disabled={disabled ? disabled : false}
						className={`input_number_field`}
						suffix={suffixText && <span>{suffixText}</span>}
						{...rest}
						defaultValue={defaultValue}
					/>
				</Form.Item>
			) : type === 'password' ? (
				<Form.Item
					label={renderLabel()}
					name={name}
					className={`${className} input_form_item`}
					rules={[
						{
							required: required,
							message: warning ? warning : 'This field is required.',
						},
						{
							pattern: Regex_CheckSpace,
							message: 'First character cannot be blank.',
						},
						{
							pattern: pattern ?? passwordPattern,
							message:
								'Password must be at least 8 characters and contain at least 1 uppercase, 1 lowercase, 1 digit, 1 special character',
						},
						{ validator: validator ?? validateRange },
					]}
				>
					<Input.Password
						placeholder={placeholder}
						disabled={disabled ? disabled : false}
						className={`input_field`}
						{...rest}
						defaultValue={defaultValue}
					/>
				</Form.Item>
			) : type === 'code' ? (
				<Form.Item
					label={renderLabel()}
					name={name}
					className={`${className} input_form_item`}
					rules={[
						{
							required: required,
							message: warning ? warning : 'This field is required.',
						},
						{
							pattern: Regex_CheckSpace,
							message: 'First character cannot be blank.',
						},
						{
							pattern: numberPattern,
							message: 'Please enter only numbers',
						},
						{ validator: validator ?? validateRange },
					]}
				>
					<div className="code_input">
						{inputs.map((input, index) => (
							<div key={index}>{input}</div>
						))}
					</div>
				</Form.Item>
			) : type === 'time' ? (
				<Form.Item
					label={renderLabel()}
					name={name}
					className={`${className} input_form_item`}
					rules={[
						{
							required: required,
							message: warning ? warning : 'This field is required.',
						},
						{
							pattern: Regex_CheckSpace,
							message: 'First character cannot be blank.',
						},
						{
							pattern: pattern,
							message: patternWarning ?? 'Enter the valid format',
						},
						{ validator: validator ?? validateRange },
					]}
				>
					<Input
						placeholder={placeholder}
						className={'input_field'}
						disabled={disabled ? disabled : false}
						suffix={suffixText && <span>{suffixText}</span>}
						status={status}
						defaultValue={defaultValue}
						type="time"
						format="HH:mm"
						{...rest}
					/>
				</Form.Item>
			) : (
				<Form.Item
					label={type !== 'search' ? renderLabel() : null}
					name={name}
					min="0"
					className={`${className} input_form_item`}
					rules={[
						{
							required: required,
							message: warning ? warning : 'This field is required.',
						},
						{
							pattern: Regex_CheckSpace,
							message: 'First character cannot be blank.',
						},
						{
							pattern: pattern,
							message: patternWarning ?? 'Enter the valid format',
						},
						{ validator: validator ?? validateRange },
					]}
				>
					<Input
						placeholder={placeholder}
						className={`${type === 'search' ? 'input_field_search' : 'input_field'} ${isArticle && 'article-input'}`}
						disabled={disabled ? disabled : false}
						prefix={type === 'search' ? <SearchOutlined /> : null}
						suffix={suffixText && <span>{suffixText}</span>}
						status={status}
						defaultValue={defaultValue}
						{...rest}
					/>
				</Form.Item>
			)}
		</>
	);
};

export default React.memo(InputField);
