import React from 'react';
import './button.scss';
import { Button } from 'antd';

const ButtonComponent = ({ title, onClick, disabled, type, className, isSubmit, icon, alt, ...rest }) => {
	let buttonContent;
	let buttonTypeClass = '';

	switch (type) {
		case 'filledText':
			buttonContent = title;
			buttonTypeClass = 'filledTextButton';
			break;
		case 'text':
			buttonContent = title;
			buttonTypeClass = 'textButton';
			break;
		case 'iconWithBorder':
			buttonContent = <img src={icon} alt={alt} />;
			buttonTypeClass = 'iconBorderButton';
			break;
		default:
			buttonContent = <img src={icon} alt={alt} />;
			buttonTypeClass = 'iconButton';
	}

	return (
		<Button
			className={`button ${buttonTypeClass} ${className}`}
			htmlType={isSubmit ? 'submit' : 'button'}
			onClick={onClick}
			disabled={disabled}
			{...rest}
		>
			{buttonContent}
		</Button>
	);
};

export default ButtonComponent;