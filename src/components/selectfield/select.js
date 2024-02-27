import React from 'react';
import { Select } from 'antd';
import './select.scss';

const CustomSelect = ({SelectData, placeholder, label, ...rest }) => (
	<div className="select" {...rest}>
		<label for="select_component">{label}</label>
		<Select id="select_component" className="select_wrapper" placeholder={placeholder}>
			{SelectData.map((option, index) => (
				<Option key={option.index} value={option.value}>
					{option.name}
				</Option>
			))}
		</Select>
	</div>
);
export default CustomSelect;
