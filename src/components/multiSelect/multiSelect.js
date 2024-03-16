import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import './multiSelect.scss';

const { Option } = Select;

const MultiSelectComponent = ({ options, placeholder, onChange }) => {
  return (
    <Select
      mode="multiple"
      placeholder={placeholder}
      onChange={onChange}
      className='select_field'
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

// Prop types validation
MultiSelectComponent.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default MultiSelectComponent;
