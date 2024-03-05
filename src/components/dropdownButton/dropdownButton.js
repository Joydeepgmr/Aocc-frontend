import React from 'react';
import downOutLined from '../../assets/DownOutLined.svg';
import { Dropdown, Space } from 'antd';
import './dropdownButton.scss';


const DropdownButton = ({ dropdownItems, buttonText, className, ...rest }) => {

  return (
    <Dropdown menu={{ items: dropdownItems }} trigger={['click']} >
      <a onClick={(e) =>
        e.preventDefault()}
        className={`create ${className}`}
        {...rest}
      >
        <Space>{buttonText}<img src={downOutLined}/></Space>
      </a>
    </Dropdown>
  );
};

export default DropdownButton;