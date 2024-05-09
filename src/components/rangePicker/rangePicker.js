import { DatePicker, Form } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import './rangePicker.scss';

const { RangePicker } = DatePicker
const DateRange = ({
    label,
    name,
    required,
    width,
    disabled,
    placeholder,
    disabledDate,
    isDisabledDate = false,
    disabledFor, // 'past' | 'future'
    format,
    className,
    defaultValue,
    onChange,
}) => {
    const renderLabel = () => {
        return (
            <>
                {label}
            </>
        );
    };
    const disablePastDates = (current) => {
        let customDate = dayjs().format('YYYY-MM-DD');
        return current && current < dayjs(customDate, 'YYYY-MM-DD');
    };
    const disableFutureDates = (current) => {
        let customDate = dayjs().format('YYYY-MM-DD');
        return current && current > dayjs(customDate, 'YYYY-MM-DD');
    };
    return (
        <Form.Item
            // label={renderLabel()}
            name={name}
            className={`${className} range_form_item`}
            rules={[
                {
                    required: required,
                    message: 'This field is required',
                },
            ]}
        >
            <RangePicker
                placeholder={placeholder}
                className="date_style"
                format={format}
                disabled={disabled}
                disabledDate={(current) => {
                    if (disabledFor === 'past') {
                        return disablePastDates(current);
                    } else if (disabledFor === 'future') {
                        return disableFutureDates(current);
                    } else if (isDisabledDate) {
                        return disabledDate(current);
                    } else {
                        return false;
                    }
                }}
                defaultValue={defaultValue}
                onChange={onChange}
            />
        </Form.Item>
    );
};

export default DateRange;
