import React from 'react';
import './button.scss';
import { Button } from 'antd';
import Editicon from '../../assets/editButton.svg';
import Deleteicon from '../../assets/deleteButton.svg';
import RightArrow from '../../assets/Right.svg';


const ButtonComponent = ({ title, onClick, disabled, type, className, isSubmit, size }) => {

	const handleClick = () => {
		if (onClick) {
			onClick();
		}
	};

	let buttonContent;

	switch (type) {
		case 'edit':
			buttonContent = <img src={Editicon} alt="Edit Icon" />;
			break;
		case 'delete':
			buttonContent = <img src={Deleteicon} alt="Delete Icon" />;
			break;
		case 'rightArrow':
			buttonContent = <img src={RightArrow} alt="Delete Icon" />;
			break;
		default:
			buttonContent = title;
	}

	return (
		<Button
			className={`button ${size} ${className}`}
			htmlType={isSubmit ? "submit" : "button"}
			onClick={handleClick}
			disabled={disabled}
		>
			{buttonContent}
		</Button>
	)
};

export default ButtonComponent;