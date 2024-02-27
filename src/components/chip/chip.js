import React from 'react';
import  {Tag}  from 'antd';
import './chip.scss';

const Chip = ({ text, className, onClick, ...rest }) => (
  <> 
      <Tag className={`custom_chip ${className}`} onClick={onClick} {...rest}>{text}</Tag>
  </>
);

export default Chip;