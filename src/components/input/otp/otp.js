import React from 'react';
import { Form } from 'antd';
import { InputOTP } from 'antd-input-otp';
import PropTypes from 'prop-types';
import './otp.scss';

const OtpField = ({ otpLength = 3, name, label, required, disabled, value, onChange, className = '' }) => {
    const otpLabel = () => {
        return (
            <>
                {label}
            </>
        );
    };

    return (
        <>
            <Form.Item
                label={otpLabel()}
                name={name}
                className={`${className} otp_form_item`}
                initialValue={value}
                rules={[
                    {
                        required: required,
                        message: 'This field is required.',
                    }
                ]}
            >
                <InputOTP length={otpLength} disabled={disabled ? disabled : false} className="otp_field" value={value} />
            </Form.Item>
        </>
    );
};


export default OtpField;
