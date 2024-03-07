import React from 'react';
import downOutLined from '../../assets/DownOutLined.svg';
import { Dropdown, Space } from 'antd';
import './dropdownButton.scss';


const DropdownButton = ({ dropdownItems, buttonText, className, onClick, ...rest }) => {
  const defaultClickHandler = (e) => {
    e.preventDefault();
  };

  const clickHandler = onClick ? onClick : defaultClickHandler;

  return (
    <Dropdown menu={{ items: dropdownItems }} trigger={['click']} >
      <a onClick={clickHandler} className={`create ${className}`} {...rest} >
        <Space>{buttonText}<img src={downOutLined}/></Space>
      </a>
    </Dropdown>
  );
};

export default DropdownButton;