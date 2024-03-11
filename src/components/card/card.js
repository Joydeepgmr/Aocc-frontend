import React from 'react';
import { Card } from 'antd';
import './card.scss';

const Cards = ({ children, style, ...rest }) => {
	return (
		<Card className={`middlecard ${style}`} {...rest}>
			{children}
		</Card>
	);
};
export default Cards;
