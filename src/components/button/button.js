import React from 'react';
import './button.scss';
import { Button } from 'antd';
import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

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
		case 'iconWithBorderEdit':
			buttonContent = <EditOutlined />;
			buttonTypeClass = 'iconBorderButton';
			break;
		case 'iconWithBorderCheck':
			buttonContent = <CheckOutlined />;
			buttonTypeClass = 'iconBorderButton';
			break;
		case 'iconWithBorderDelete':
			buttonContent = <DeleteOutlined />;
			buttonTypeClass = 'iconBorderButton';
			break;
		case 'iconWithBorder':
			buttonContent = <DeleteOutlined />;
			buttonTypeClass = <img src={icon} alt={alt} />;
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