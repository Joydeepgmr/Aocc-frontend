import { Tabs } from 'antd';
import React from 'react';

const CustomTabs = ({ defaultActiveKey, items, onChange }) => {
	return (
		<Tabs defaultActiveKey={defaultActiveKey} onChange={onChange}>
			{items.map((item) => (
				<Tabs.TabPane tab={item.label} key={item.key}>
					{item.children}
				</Tabs.TabPane>
			))}
		</Tabs>
	);
};

export default CustomTabs;
