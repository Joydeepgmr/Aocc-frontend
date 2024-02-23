import React from 'react';
import { Input } from 'antd';
import './textField.scss';

const { TextArea } = Input;

const TextField = ({row, placeholder, className, ...rest}) => (
  <TextArea rows={row} placeholder={placeholder} className={`custom_textarea ${className}`} {...rest} />
);

export default TextField;