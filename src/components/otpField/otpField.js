import React from 'react';
import { Button, Form } from 'antd'
import CustomTypography from '../typographyComponent/typographyComponent';
import { InputOTP } from 'antd-input-otp';
import PropTypes from 'prop-types';
import './otpField.scss';

const OtpField = ({ 
    otpLength = 3, 
    onFinish, 
    label,
    required,
    disabled,
    className="",
}) => {
    const otpLabel = () => {
        return(
            <>
            {label}
            {required && <span style={{ color: 'red' }}> *</span>}
            </>
        );
    };

    return (
        <>
            <Form.Item 
            label={otpLabel()}
            name="otp"
            className={`${className} otp_form_item`}
            >
                <InputOTP inputType="numeric" length={otpLength} disabled={disabled ? disabled : false} className="otp_field" />
            </Form.Item>
        </>    
    );
};

OtpField.propTypes = {
    otpLength: PropTypes.number.isRequired,
    onFinish: PropTypes.func.isRequired,
};

export default OtpField;