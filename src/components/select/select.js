import React from 'react';
import { Select, Form } from 'antd';
import './select.scss';

const CustomSelect = ({ SelectData, placeholder, label, required, className, name, disabled, onChange, ...rest }) => {
    const renderLabel = () => {
        return (
            <>
                {label}
                {/* {required && <span style={{ color: 'red' }}> *</span>} */}
            </>
        );
    };

    const handleSelectChange = (value) => {
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <>
            <Form.Item
                name={name}
                disabled={disabled ? disabled : false}
                label={label && renderLabel()}
                className={`select ${className}`}
                rules={[
                    {
                        required: required,
                        message: 'This field is required.',
                    },
                ]}
            >
                <Select
                    className="select_wrapper"
                    disabled={disabled}
                    placeholder={placeholder}
                    onChange={handleSelectChange}
                    {...rest}
                >
                    {SelectData.map((option, index) => (
                        <Select.Option key={index} value={option.value}>
                            {option?.label}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </>
    );
};

export default CustomSelect;
