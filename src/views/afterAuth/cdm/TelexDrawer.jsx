import { Drawer } from 'antd';
import React, { useEffect, useState } from 'react';
import './telexDrawer.scss';

const ParsedMessageComponent = ({ data = {} }) => {
	const formatNestedData = (data) => {
		if (Array.isArray(data)) {
			return data.map(formatNestedData).join(', ');
		} else if (typeof data === 'object' && data !== null) {
			return Object.entries(data)
				.map(([key, value]) => {
					if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
						return `${key}: { ${formatNestedData(value)} }`;
					}
					return `${key}: ${value}`;
				})
				.join(', ');
		} else {
			return data ?? '-';
		}
	};

	return (
		<div className="telex_message">
			{Object.entries(data).map(([key, value]) => (
				<div key={key} className="telex_message_container">
					<span className="message_key">{key}: </span>
					<span className="message_value">{formatNestedData(value)}</span>
				</div>
			))}
		</div>
	);
};

const TelexDrawer = ({ isOpen, onClose, data }) => {
	const [open, setOpen] = useState(false);
	useEffect(() => {
		setOpen(isOpen);
	}, [isOpen]);
	return (
		<Drawer title="Latest Telex Message" onClose={onClose} open={open}>
			{data && Object.keys(data).length ? <ParsedMessageComponent data={data} /> : <div>No recent message</div>}
		</Drawer>
	);
};

export default TelexDrawer;
