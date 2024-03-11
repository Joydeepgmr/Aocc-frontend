// DropdownButton.js
import React from 'react';
import downOutLined from '../../assets/DownOutLined.svg';
import { Dropdown, Menu, Space } from 'antd';
import { Dropdown, Menu, Space } from 'antd';
import './dropdownButton.scss';

const DropdownButton = ({ dropdownItems, buttonText, className, onChange, ...rest }) => {
	const handleItemClick = (e, item) => {
		onChange(item.value);
	};

	const menu = (
		<Menu>
			{dropdownItems.map((item) => (
				<Menu.Item key={item.key} onClick={(e) => handleItemClick(e, item)}>
					{item.label}
				</Menu.Item>
			))}
		</Menu>
	);

	return (
		<Dropdown overlay={menu} trigger={['click']}>
			<a className={`create ${className}`} {...rest}>
				<Space>
					{buttonText}
					<img src={downOutLined} alt="Dropdown Icon" />
				</Space>
			</a>
		</Dropdown>
	);
};
 
export default DropdownButton;
