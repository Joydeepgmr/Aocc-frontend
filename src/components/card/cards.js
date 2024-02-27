import React from 'react';
import { Card } from 'antd';
import './card.scss';


const Cards = ({
	children,
	...rest
}) => {
	
	return (
		<Card className="middlecard" {...rest}>
			{children}
		</Card>
	);
};
export default Cards;
