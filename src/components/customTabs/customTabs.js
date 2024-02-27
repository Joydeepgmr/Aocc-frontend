import { Tabs } from 'antd';
import React from 'react';
import './customTabs.scss';

const CustomTabs = ({ defaultActiveKey, items, onChange, type, rest }) => {
	if (type === 'card') {
		return (
			<Tabs
				defaultActiveKey={defaultActiveKey}
				onChange={onChange}
				type="card"
				className="custom_tabs_card"
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
		<Tabs defaultActiveKey={defaultActiveKey} onChange={onChange} {...rest}>
			{items.map((item) => (
				<Tabs.TabPane tab={item.label} key={item.key}>
					{item.children}
				</Tabs.TabPane>
			))}
		</Tabs>
	);
};

export default CustomTabs;
