import React, { useState } from 'react';
import { Form } from 'antd';
import { InputOTP } from 'antd-input-otp';
import PropTypes from 'prop-types';
import './otpField.scss';

const OtpField = ({ otpLength = 3, name, label, required, disabled, className = '' }) => {
	const otpLabel = () => {
		return (
			<>
				{label}
				{required && <span style={{ color: 'red' }}> *</span>}
			</>
		);
	};

	return (
		<>
			<Form.Item label={otpLabel()} name={name} className={`${className} otp_form_item`}>
				<InputOTP
					inputType="numeric"
					length={otpLength}
					disabled={disabled ? disabled : false}
					className="otp_field"
				/>
			</Form.Item>
		</>
	);
};

OtpField.propTypes = {
	otpLength: PropTypes.number.isRequired,
	onFinish: PropTypes.func.isRequired,
};

export default OtpField;
