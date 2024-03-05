import React from 'react';
import { Button, Form } from 'antd';
import { InputOTP } from 'antd-input-otp';
import PropTypes from 'prop-types';
import './otpField.scss';

const OtpField = ({ otpLength, onFinish }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        if (onFinish) {
            onFinish(values.otp);
        }
    };
    return (
        <Form onFinish={handleFinish} form={form}>
            <Form.Item name="otp">
                <InputOTP autoSubmit={form} inputType="numeric" length={otpLength} className="otpField" />
            </Form.Item>
        </Form>
    );
};

OtpField.propTypes = {
    otpLength: PropTypes.number.isRequired,
    onFinish: PropTypes.func.isRequired,
};

export default OtpField;