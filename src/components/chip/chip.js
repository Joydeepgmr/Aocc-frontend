import React from 'react';
import './chip.scss';
import { Space, Tag } from 'antd';

const Chip = ({ text, className }) => (
  <>
    <Space size={[0, 8]} wrap>
      <Tag className={`custom-tag ${className}`}>{text}</Tag>
    </Space>
  </>
);

export default Chip;