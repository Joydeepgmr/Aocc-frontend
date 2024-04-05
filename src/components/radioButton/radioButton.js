import React from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

const CustomRadioGroup = ({ options, onChange, disabled }) => {
  return (
    <RadioGroup onChange={onChange}>
      {options.map((option) => (
        <Radio key={option.value} value={option.value} disabled={disabled}>
          {option.label}
        </Radio>
      ))}
    </RadioGroup>
  );
};

export default CustomRadioGroup;
