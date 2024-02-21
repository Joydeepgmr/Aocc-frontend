import { Checkbox, Form } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import './checkBoxField.scss';

const CheckBoxField = ({
	options,
	selectedValue,
	selectedName,
	name,
	title,
	message,
	required,
	label,
	className = '',
}) => {
	return (
		<>
			{options?.length ? (
				<Form.Item
					name={name}
					label={<Title level={5}>{title}</Title>}
					rules={[
						{
							required: required ? true : false,
							message: message ? message : 'This field is required.',
						},
					]}
				>
					<Checkbox.Group className={`checkbox-group ${className}`}>
						{options?.map((data, index) => {
							return (
								<Checkbox key={index} value={selectedValue ? data?.[selectedValue] : data}>
									<span>{selectedName ? data?.[selectedName] : data}</span>
								</Checkbox>
							);
						})}
					</Checkbox.Group>
				</Form.Item>
			) : (
				<Form.Item name={name} valuePropName="checked">
					<Checkbox>{label}</Checkbox>
				</Form.Item>
			)}
		</>
	);
};

export default React.memo(CheckBoxField);
