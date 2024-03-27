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
			>
				{items.map((item) => (
					<Tabs.TabPane tab={item.label} key={item.key}>
						{item.children}
					</Tabs.TabPane>
				))}
			</Tabs>
		);
	}

	return (
		<Tabs
			defaultActiveKey={defaultActiveKey}
			onChange={onChange}
			tabBarExtraContent={extraContent}
			className={`custom_tabs_plain ${className}`}
			{...rest}
		>
			{items.map((item) => (
				<Tabs.TabPane tab={item.label} key={item.key}>
					{item.children}
				</Tabs.TabPane>
			))}
		</Tabs>
	);
};

export default CustomTabs;
