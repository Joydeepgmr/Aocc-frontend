import React from 'react';
import './button.scss';
import { Button } from 'antd';
import Editicon from '../../assets/editButton.svg';
import Deleteicon from '../../assets/deleteButton.svg';
import Arrow from '../../assets/Arrow.svg';
import RightArrow from '../../assets/RightArrow.svg';
import LeftArrow from '../../assets/LeftArrow.svg';
import Filter from '../../assets/Filter.svg';

const ButtonComponent = ({ title, onClick, disabled, type, className, isSubmit, ...rest}) => {
	
	let buttonContent;

	switch (type) {
		case 'edit':
			buttonContent = <img src={Editicon} alt="Edit Icon" />;
			break;
		case 'delete':
			buttonContent = <img src={Deleteicon} alt="Delete Icon" />;
			break;
		case 'arrow':
			buttonContent = <img src={Arrow} alt="Arrow Icon" />;
			break;
		case 'rightArrow':
			buttonContent = <img src={RightArrow} alt="RightArrow Icon" />;
			break;
		case 'leftArrow':
			buttonContent = <img src={LeftArrow} alt="LeftArrow Icon" />;
			break;
		case 'filter':
			buttonContent = <img src={Filter} alt="Filter Icon" />;
			break;
		default:
			buttonContent = title;
	}

	return (
		<Button
			className={`button ${className}`}
			htmlType={isSubmit ? "submit" : "button"}
			onClick={onClick}
			disabled={disabled}
			{...rest}
		>
			{buttonContent}
		</Button>
	)
};

export default ButtonComponent;