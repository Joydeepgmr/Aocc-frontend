import React from 'react';
import { Radio, Form } from 'antd';

const RadioGroup = Radio.Group;

const CustomRadioGroup = ({ name, options, onChange, disabled }) => {
  return (
    <Form.Item name={name}>
      <RadioGroup onChange={onChange}>
        {options.map((option) => (
          <Radio key={option.value} value={option.value} disabled={disabled}>
            {option.label}
          </Radio>
        ))}
      </RadioGroup>
    </Form.Item>
  );
};

export default CustomRadioGroup;
