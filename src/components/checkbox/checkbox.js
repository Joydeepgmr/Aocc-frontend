import { Checkbox, Form } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import './checkbox.scss';

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
	onChange,
	disabled,
	rest,
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
					{...rest}
				>
					<Checkbox.Group className={`checkbox_group ${className}`}>
						{options?.map((data, index) => {
							return (
								<Checkbox key={index} value={selectedValue ? data?.[selectedValue] : data} onChange={onChange} disabled={disabled}>
									<span>{selectedName ? data?.[selectedName] : data}</span>
								</Checkbox>
							);
						})}
					</Checkbox.Group>
				</Form.Item>
			) : (
				<Form.Item name={name} valuePropName="checked" {...rest} onChange={onChange}>
						<Checkbox disabled={disabled}>{label}</Checkbox>
				</Form.Item>
			)}
		</>
	);
};

export default React.memo(CheckBoxField);
