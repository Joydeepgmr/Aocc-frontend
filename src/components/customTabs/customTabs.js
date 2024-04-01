import { Tabs } from 'antd';
import React from 'react';
import './customTabs.scss';

const CustomTabs = ({ defaultActiveKey, items, onChange, type, rest, className, extraContent }) => {
	console.log('items', items);
	if (type === 'card') {
		return (
			<Tabs
				defaultActiveKey={defaultActiveKey}
				onChange={onChange}
				tabBarExtraContent={extraContent}
				type="card"
				className={`custom_tabs_card ${className}`}
				{...rest}
				items={items.map((item, i) => {
					const id = String(i + 1);
					return {
						key: id,
						label: item.label,
						children: item.children,
						//   icon: <Icon />,
					};
				})}
			/>
		);
	}

	return (
		<Tabs
			defaultActiveKey={defaultActiveKey}
			onChange={onChange}
			tabBarExtraContent={extraContent}
			className={`custom_tabs_plain ${className}`}
			{...rest}
			items={items.map((item, i) => {
				const id = String(i + 1);
				return {
					key: id,
					label: item.label,
					children: item.children,
					//   icon: <Icon />,
				};
			})}
		/>
	);
};

export default CustomTabs;
