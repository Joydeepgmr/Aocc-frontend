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
			<Form.Item {...rest}>
				<div className="select">
					<label htmlFor="select_component">{renderLabel()}</label>
					<Select className="select_wrapper" placeholder={placeholder}>
						{SelectData.map((option, index) => (
							<Option key={option.index} value={option.value}>
								{option.name}
							</Option>
						))}
					</Select>
				</div>
			</Form.Item>
		</>
	);
};
export default CustomSelect;
