import React from 'react';
import { Select, Form } from 'antd';
import './select.scss';

const CustomSelect = ({ SelectData = [], placeholder, label, required, className, name, disabled, onChange, multiple, ...rest }) => {
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

    const filterOption = (inputValue, option) => {
        return option.children.toLowerCase().includes(inputValue.toLowerCase());
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
                    mode={multiple && 'multiple'}
                    showSearch
                    className="select_wrapper"
                    allowClear
                    disabled={disabled}
                    placeholder={placeholder}
                    onChange={handleSelectChange}
                    filterOption={filterOption}
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
