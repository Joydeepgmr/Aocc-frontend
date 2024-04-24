import React from 'react'
import { InputOTP } from 'antd-input-otp';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import './numericField.scss';

const NumericField = ({otpLength = 3, name, label, disabled, value, onChange, className=''}) => {

    return (
        <div classNames={`${className} otp_form_item`}>
            <CustomTypography type="text" fontSize={16} fontWeight="400" color="black">
				{label}
			</CustomTypography>
            <InputOTP length={otpLength} disabled={disabled ? disabled : false} value={value} name={name} onChange={onChange} className="otp_field" />
        </div>
    )
}

export default NumericField;