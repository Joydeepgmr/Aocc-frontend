import React from 'react';
import { Radio, Form } from 'antd';

const RadioGroup = Radio.Group;

const CustomRadioGroup = ({ name, options, onChange, disabled, label, required }) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required,
          message: 'This field is required.',
        }]}
    >
      <RadioGroup onChange={onChange}>
        {options.map((option) => (
          <Radio key={option.value} value={option.value} disabled={disabled}>
            {option.label}
          </Radio>
        ))}
      </RadioGroup>
    </Form.Item >
  );
};

export default CustomRadioGroup;
